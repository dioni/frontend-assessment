<template>
    <div class="mt-3">
        <b-container>
            <b-row>
                <b-col>
                    <div>
                        Bedrooms 
                        <b-form-select 
                        v-model="filter.Bedrooms" 
                        :options="bedRoomsOptions"></b-form-select>
                    </div>
                </b-col>
                <b-col>
                    <div>
                        Bathrooms 
                        <b-form-select 
                        v-model="filter.Bathrooms" 
                        :options="bathRoomsOptions"></b-form-select>
                    </div>
                </b-col>
                <b-col>
                    <div>
                        Parking 
                        <b-form-select 
                        v-model="filter.Parking" 
                        :options="parkingOptions"></b-form-select>
                    </div>
                </b-col>
                <b-col>                    
                    Pricerange 
                </b-col>
                <b-col>
                    <div>                         
                        <b-form-input 
                            id="range-1" 
                            v-model="filter.Pricerange" 
                            :title="filter.Pricerange"
                            v-b-tooltip.hover
                            type="range" 
                            :min="minPricerange" 
                            :max="maxPricerange">
                        </b-form-input>
                    </div>
                </b-col>
                <b-col>
                    <b-button @click="getRealStateList">Search</b-button>
                </b-col>
            </b-row>
        </b-container>
        
        <b-container class="mt-3">
            <b-row>
                <b-col v-for="(item, index) in realStateData" :key="index">
                    <b-card
                    :title="item.Title"
                    :sub-title="item.Location"
                    :img-src="item.ThumbnailURL"
                    :img-alt="item.Title"
                    img-top
                    tag="article"
                    style="width: 16rem;"
                    class="mb-2"
                    >
                        <b-card-text>
                            {{ item.Bedrooms }} beds | {{ item.Bathrooms }} baths
                        </b-card-text>
                        <b-card-body>
                            ${{ item['Sale Price'] }}
                        </b-card-body>

                        <b-button @click="openDetails(item.Id)"  variant="primary">View Details</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>                 
             
    </div>
</template>
<script>

import { getRealStateDataAPI } from '../services/realstate-api-service.js'

export default {
    name: 'RealStateList',
    data() {
        return {
            filter: {},
            realStateData: [],
            bedRoomsOptions: [],
            bathRoomsOptions: [],
            parkingOptions: [],
            minPricerange: 0,
            maxPricerange: 0,
        }
    },
    mounted() {
        this.getRealStateList()
    },
    methods: {
        async getRealStateList() {
            try {                
                this.realStateData = await getRealStateDataAPI()
                this.fillOptions()
                this.applyFilter()
            } catch (error) {
                console.log(error)
            }
        },
        applyFilter() {
           
            if (this.filter.Bedrooms > 0) {
                this.realStateData = this.realStateData
                .filter((data) => data.Bedrooms == this.filter.Bedrooms)
            } 
            
            if (this.filter.Bathrooms > 0) {
                this.realStateData = this.realStateData
                .filter((data) => data.Bathrooms == this.filter.Bathrooms)
            }  
            
            if (this.filter.Parking > 0) {
                this.realStateData = this.realStateData
                .filter((data) => data.Parking == this.filter.Parking)
            } 
           
            if (this.filter.Pricerange) {
                this.realStateData = this.realStateData
                .filter((data) => data['Sale Price'] <= this.filter.Pricerange)
            }            
        },  
        fillOptions() {
             
            this.bedRoomsOptions =  [...new Set(this.realStateData.map(item => item.Bedrooms))].sort()
            this.bathRoomsOptions =  [...new Set(this.realStateData.map(item => item.Bathrooms))].sort()
            this.parkingOptions =  [...new Set(this.realStateData.map(item => item.Parking))].sort()
            const orderedPriceOptions = this.realStateData.map(item => item['Sale Price']).sort()
            this.minPricerange = orderedPriceOptions[0]
            this.maxPricerange = orderedPriceOptions[this.realStateData.length - 1]
        },
        openDetails(id) {
            this.$router.push(`/realstate/${id}`)
        }
    }
}
</script>

<style>


</style>