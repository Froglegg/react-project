import React from 'react';
import {
    Redirect
  } from "react-router-dom"; 
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
axios.defaults.withCredentials = true;

 

export default class AllWinesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winelist: []
        }
    }
    async componentDidMount() {
        const allWines = await axios ({
            method:'get',
            url: '/api/wines'
    
        }).then( resp => {
            return resp.data;
        });
    this.setState({
        winelist: allWines.wineList
    })
    }

    // _handleDel= (event, index) => {
    //     event.preventDefault();
    //     this.props.handleDel(this.props.winelist, index);
    // }

    // _handleDel= async (event, wineId, index) => {
    //     console.log(this.props)
    //     event.preventDefault();
    //     this.props.handleDel(this.props.winelist.wines, index);
    //     const deleted = await axios({
    //         method: 'post',
    //         url: "/api/delete",
    //         data: {
    //             wine_id: wineId
    //         }
    //     }).then( resp => {
    //         return resp.data;
    //     });
    //     console.log(deleted)
    // }

    

    _handleFavorite= async (event, wineId) => {
        const favorites = await axios({
            method: 'post',
            url: "/api/addtofavorites",
            data: {
                wine_id: wineId
            }
        }).then( resp => {
            return resp.data;
        });
        console.log(favorites)
    }

    render() {
        console.log(this.props)
        console.log(this.state.winelist)
        return ( 
            
            <div>
    
                <div className="rated-wines-title">All rated wines:</div>
                <div className="wine-list-container">
                {
                    
                    this.state.winelist.map( (m, i) => (
                        <div className="rated-wine-cards"> 
                            <ul> 
                                <div key={i}>{m.wine_name}
                                <li key={i}>Type: {m.wine_type}
                                </li>
                                <li key={i}>Price: {m.wine_price}
                                </li>
                                <li key={i}>Bought at: {m.wine_store}
                                </li>
                                
                            
                                <li key={i}>Comments: {m.comments}
                                </li>
                                <li key={i}><div className="label-container">Wine Label: <img src={m.wine_label} alt="wine label"/>
                                </div>
                                </li>
                                <li key={i}>
                                    <StarRatingComponent className="wine-glasses"
                                        name="app3"
                                        starCount={5}
                                        value={Number(m.wine_rating)}
                                        editing={false}
                                        starColor="#f00"
                                        renderStarIcon={() => <span><i class="fas fa-wine-glass-alt"></i></span>} />
                                </li>
                                {/* <input type="submit" value="Edit" className="wine-edit" /> */}

                                <input type="button" value="❤️" onClick={(event)=> this._handleFavorite(event, m.id)} />

                                {/* <input type="button" value="Delete" className="wine-edit" onClick={(event)=> this._handleDel(event, m.id, i)} /> */}

                                </div>
                            </ul>
                            </div>
                    ))
                }
                {/* {!this.state.isLoggedIn && <Redirect to ="/"/>}  */}

                </div>

            </div>
        )
    } 
}

