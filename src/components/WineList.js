import React from 'react';
import MyWineSearch from '../containers/MyWineSearchContainer';


import {
    Redirect, useHistory, Link
  } from "react-router-dom"; 
import StarRatingComponent from 'react-star-rating-component';

import axios from 'axios';
axios.defaults.withCredentials = true;



export default class WineList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // winelist: this.props.winelist.wines
            winelist: []
        }
    }
    

    async componentDidMount() {
        


        console.log(this.props)
        console.log(this.props.winelist)
        
        await this.props.getWines();
        console.log(this.props.winelist)
    }

    // _handleDel= (event, index) => {
    //     event.preventDefault();
    //     console.log('calling handle del')
    //     this.props.handleDel(this.props.winelist.wines, index);
    // }

    _handleDel= async (event, wineId, index) => {
        console.log(this.props)
        event.preventDefault();
        await this.props.handleDel(this.props.winelist.wines, wineId, index);
        console.log(this.props)
        await this.props.getWines();
        console.log(this.props)
    }
    _handleEdit= async (event, wineId) => {
        console.log('we want to redirect')

    }

    render() {
        console.log(this.state)
        console.log(this.props)
        if (this.props.winelist.wines.length === 0) { 
            return <div className="rated-wines-title">You have not rated any wines yet</div> 
        } else { 
        
        return ( 
            
            <div>
<div className="rated-wines-title">Search:
                </div>   
                 <MyWineSearch />
                <div className="rated-wines-title">My rated wines:
                </div>
                
                <div className="wine-list-container">
                {
                    
                    this.props.winelist.wines.map( (m, i) => (
                        <div key={`wine-${m.wine_name}-${i}`}className="rated-wine-cards"> 
                            <ul> 
                                <div>
                                    <div className="wine-name"> {m.wine_name} </div>
                                <li>Type: {m.wine_type}
                                </li>
                                <li>Price: {m.wine_price}
                                </li>
                                <li>Bought at: {m.wine_store}
                                </li>
                                <li>Comments: {m.comments}
                                </li>
                                <li><div className="label-container">Wine Label: <img src={`/images/${m.wine_label}`} alt="wine label"/>
                                </div>
                                </li>
                                <li>
                                    <StarRatingComponent className="wine-glasses"
                                        name="app3"
                                        starCount={5}
                                        value={Number(m.wine_rating)}
                                        editing={false}
                                        starColor="#f00"
                                        renderStarIcon={() => <span><i class="fas fa-wine-glass-alt"></i></span>} />
                                </li>
                                <Link to={{
                                    pathname: `/edit/${m.id}`,
                                    params: {
                                        wineId: m.id,
                                        wine_name: m.wine_name,
                                        wine_type: m.wine_type,
                                        wine_price: m.wine_price,
                                        wine_store: m.wine_store,
                                        comments: m.comments,
                                        wine_label: m.wine_label,
                                        wine_rating: m.wine_rating
                                    }

                                }}>
                                    <input type="button" 
                                    value="Edit" className="wine-edit" 
                                    // onClick={(event) => this._handleEdit(event, m.id)}  
                                    />
                                </Link>
                                
                                <input type="button" value="Delete" className="wine-edit" onClick={(event)=> this._handleDel(event, m.id, i)} />

                                </div>

                            </ul>
                            </div>
                    ))
                }

                {this.props.loginStatus.isLoggedIn == false ? <Redirect to ="/"/> : ""}   
                </div>

            </div>
        )
    } 
}
}


