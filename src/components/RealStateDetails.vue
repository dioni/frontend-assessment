<template>
    <div class="mt-3">
        <b-container>
            <b-row>
                <b-col cols="8">
                    <b-row>
                        <b-col>
                            <b-row>
                                <b-col>
                                    <span class="info-value">{{ realStateDetail.Title }}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <span class="info-label">{{ realStateDetail.Location }}</span>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-right">
                                    <span class="info-value">${{ realStateDetail['Sale Price'] }}</span>                                    
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-right">
                                    <span class="info-label">Date Listed: {{ formatedDate }}</span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <img :src="realStateDetail.PictureURL" />
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-value">{{ realStateDetail.Bedrooms }}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-label">BED</span>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-value">{{ realStateDetail.Bathrooms }}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-label">BATH</span>                                    
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-value">{{ realStateDetail.Parking }}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-label">PARKING</span>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-value">{{ realStateDetail.Sqft }}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-label">SQFT</span>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-value">{{ realStateDetail.YearBuilt }}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-center">
                                    <span class="info-label">YEAR BUILT</span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <span class="info-label">{{ realStateDetail.Description }}</span>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="4" class="ml-3">
                    <b-row>
                        <b-col>
                            <b-button id="save-property-button" squared variant="primary">Save Property</b-button>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <ContactForm />
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import moment from "moment";
import { getRealStateDataAPI } from '../services/realstate-api-service.js'
import ContactForm from "./ContactForm.vue";

export default {
    name: 'RealStateDetails',
    components: {
        ContactForm
    },
    data() {
        return {
            realStateDetail: {},
        }
    },
    mounted() {
        this.getRealStateDetail()
    },
    computed: {        
        formatedDate() {
            if (this.realStateDetail.DateListed) {
                return moment(this.realStateDetail.DateListed, "YYYY-MM-dd HH:mm:ss").format("MMM d, YYYY")
            }
            else
                return null
        }
    },
    methods: {
        async getRealStateDetail() {
            try {                
                const realStateData = await getRealStateDataAPI()                
                this.applyFilter(realStateData)
            } catch (error) {
                console.log(error)
            }
        },
        applyFilter(realStateData) {
            this.realStateDetail = realStateData
                .find((data) => data.Id == this.$route.params.id)
        },
    }
}
</script>
<style>

.info-value {
    font-weight: bold;
}

.info-label {
    color: gray;
    font-size: 14px;
}

div.text-right {
    text-align: right;
}

#save-property-button {
    width: 200px;
    float:right;
}
</style>