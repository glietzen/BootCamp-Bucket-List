// import React, { Component } from 'react';
// import API from '../utils/API';

// export default class BucketList extends Component {
//     state = {
//         place: '',
//         keyword: '',
//         result: {},
//         listItems: [],
//         title: ''
//     };

//     componentDidMount() {
//         this.loadList();
//     }

//     loadList = () => {
//         API.getList()
//             .then(res => this.setState({ listItems: res.data }))
//             .catch(err => console.log(err)); 
//     };

//     deleteItem = id => {
//         API.deleteItem(id)
//             .then(res => this.loadBooks())
//             .catch(err = console.log(err));
//     };

//     handleNewItemSubmit = event => {
//         event.preventDefault();
//         if (!this.state.title || !this.state.location || !this.state.description) {
//             API.saveItem({
//                 title: this.state.title,
//                 location: this.state.location,
//                 description: this.state.description
//             })
//                 .then(res => this.loadList())
//                 .catch(err => console.log(err));
//         }
//     };

//     handleItemClick = placeID => {
//         Api.saveItem({
//             title: this.state.result.results[placeID].name
//         })
//             .then(res => this.loadList())
//             .catch(err => console.log(err));
//     };

//     searchPlace = (place) => {
//         API.search(place)
//             .then(res => this.findEvent(res.candidates.geometry.location.lat, res.candidates.geometry.location.lng))
//             .catch(err => console.log(err));
//     };

//     findEvent = (lat, lng) => {
//         API.placeDetails(lat, lng, keyword)
//             .then(res => this.setState({ result: res.results }))
//             .catch(err => console.log(err));
//     }

//     handlePlaceSubmit = event => {
//         event.preventDefault();
//         this.searchPlace(this.state.place, this.state.keyword);
//     };
  
//     render() {
//         return (
//             <div>
        
//             </div>
//         )
//     }
// }
