import axios from "axios";
const BaseURL1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";
const BaseURL2 = "&inputtype=textquery&fields=geometry&key=";
const APIKey = "AIzaSyDNvRIIHKf7Sai1B95TD0dYbKGvL7b2oLs";
const BaseURL3 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
const BaseURL4 = "&radius=25000&rankby=prominence&keyword=";
const BaseURL5 = "&key=";

export default {
    getList: function() {
        return axios.get("/api/lists/")
    },
    deleteItem: function(id) {
        return axios.delete("/api/items/" + id);
    },
    saveItem: function(itemData) {
        return axios.post("/api/items", itemData);
    },
    search: function(place) {
        return axios.get(BaseURL1 + place + BaseURL2 + APIKey)
    },
    placeDetails: function(lat, lng, keyword) {
        return axios.get(BaseURL3 + lat + lng + BaseURL4 + keyword + BaseURL5 + APIKey)
    }
};