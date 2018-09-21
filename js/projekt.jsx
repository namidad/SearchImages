import React from 'react';
import ReactDOM from 'react-dom';
import Particles from 'react-particles-js'

const particleOptions = {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 600,
                    }
                }
            }

    };

document.addEventListener('DOMContentLoaded', () => {

    class ImagesGallery extends React.Component{

        constructor(props){
            super(props);

            this.state = {
                urlArray: [],
                loading: false,
            }
        }


        searchImages = () => {
            if(this.props.searchTerm.length>0){
                fetch(`https://api.unsplash.com/search/photos/?query=${this.props.searchTerm}&client_id=107ab9049ae72d712b8e0cd33ebb97484e4f825e1b7b68b12130c30d950cadb4`)
                    .then(r => r.json())
                    .then(data => {
                        if(data.results.length===0) {
                            this.setState({
                                loading: false,
                            });
                        } else {
                            let array=[];
                            for(let i=0;i<data.results.length;i++){
                                array.push(data.results[i].urls.small);
                            }
                            if(array[0]!=this.state.urlArray[0]){
                                this.setState({
                                    urlArray: [...array],
                                    loading: true,
                                });
                            }
                        }

                    });
            }
        };




        render(){
            this.searchImages();
            if(this.state.loading && this.state.urlArray.length>0){
                const photos = this.state.urlArray.map((el,index)=>{

                    const myStyle = {
                        backgroundImage: "url('"+el+"')",
                    };

                    return(
                        <div
                            onClick={this.handleClickImage}
                            style={myStyle}
                            key={index} />
                    );
                });
                return(
                    <div className={"photosContainer"}>
                        {photos}
                    </div>
                );
            }
            return null;

        }
    }


    class ImagesInfo extends React.Component {

        constructor(props){
            super(props);

            this.state = {
                inputValue: "",
            }
        }


        handleOnSumbit = (event) => {
            event.preventDefault();
        };

        handleInputChange = (event) => {
            this.setState({
                inputValue: event.target.value,
            })
        };


        render(){
            if(this.state.inputValue.length>0){
                return(
                        <div className={"mainContainer"}>

                            <form onSubmit={this.handleOnSumbit}>
                                <input
                                    type={"text"}
                                    value={this.state.inputValue}
                                    onChange={this.handleInputChange}
                                />
                            </form>
                            <ImagesGallery searchTerm={this.state.inputValue} />

                    </div>


                );
            } else {
                return(
                    <div className={"mainContainer"}>
                        <form onSubmit={this.handleOnSumbit}>
                            <input
                                type={"text"}
                                placeholder={"Search images..."}
                                value={this.state.inputValue}
                                onChange={this.handleInputChange}
                            />
                        </form>
                    </div>
                );
            }

        }
    }


    class App extends React.Component {
        render() {
            return <div>
                <Particles params={particleOptions}
                           style={{position: "absolute", zIndex: "-1", height:"100vh"}}
                />
                <ImagesInfo />
            </div>

        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );

});