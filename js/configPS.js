/*global dojo */
/** @license
 | Version 10.2
 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
dojo.provide("js.Config");
dojo.declare("js.Config", null, {

    // This file contains various configuration settings for "HTML5" template
    //
    // Use this file to perform the following:
    //
    // 1.  Specify application title                  - [ Tag(s) to look for: ApplicationName ]
    // 2.  Set path for application icon              - [ Tag(s) to look for: ApplicationIcon ]
    // 3.  Set splash screen message                  - [ Tag(s) to look for: SplashScreenMessage ]
    // 4.  Set URL for help page                      - [ Tag(s) to look for: HelpURL ]
    //
    // 5.  Specify URLs for base maps                  - [ Tag(s) to look for: BaseMapLayers ]
    // 6.  Set initial map extent                     - [ Tag(s) to look for: DefaultExtent ]
    //
    // 7.  Or for using map services:
    // 7a. Customize info-Window settings             - [ Tag(s) to look for: InfoWindowHeader, InfoPopupFieldsCollection ]
    // 7b. Customize info-Popup size                  - [ Tag(s) to look for: InfoPopupHeight, InfoPopupWidth ]
    // 7c. Customize data formatting                  - [ Tag(s) to look for: ShowNullValueAs]
    //
    // 8. Customize address search settings           - [ Tag(s) to look for: LocatorURL, LocatorFields, DefaultValue, LocatorMarkupSymbolPath, LocatorRippleSize ]
    //
    // 9. Set URL for geometry service               - [ Tag(s) to look for: GeometryService ]
    //
    // 10. Customize routing settings for directions  - [ Tag(s) to look for: RouteServiceURL, RouteColor, RouteWidth, SearchforDirections]
    //
    // 11. Configure data to be displayed on the bottom panel, ReferenceOverlayLayer
    //                                                - [ Tag(s) to look for: InfoBoxWidth, Services, ReferenceOverlayLayer]
    //
    // 12. Customize the Zoom level, CallOutAddress, Render color, ripple size
    //                                                - [ Tag(s) to look for: Zoom level, CallOutAddress, RendererColor, RippleSize]
    //
    // 13. Specify URLs for map sharing               - [ Tag(s) to look for: MapSharingOptions (set TinyURLServiceURL, TinyURLResponseAttribute) ]
    // 13a.In case of changing the TinyURL service
    //     Specify URL for the new service            - [ Tag(s) to look for: FacebookShareURL, TwitterShareURL, ShareByMailLink ]
    //
    //

    // ------------------------------------------------------------------------------------------------------------------------
    // GENERAL SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set application title.
    ApplicationName: "My Government Services",

    // Set application icon path.
    ApplicationIcon: "images/appIcon.png",

    // Set splash window content - Message that appears when the application starts.
    SplashScreenMessage: "The <b>My Hazard Information</b> application helps residents discover hazards that exist in their community and obtain information about evacuation routes and shelters provided by a government agency.<br/> <br/>To locate an area of interest, simply enter an address in the search box, or use your current location. Your location will then be highlighted on the map and relevant evacuation and facility information will be presented to the user.<br/><br/>",

    // Set URL of help page/portal.
    HelpURL: "help.htm",

    // ------------------------------------------------------------------------------------------------------------------------
    // BASEMAP SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set baseMap layers.
    // Please note: All base maps need to use the same spatial reference. By default, on application start the first base map will be loaded
    BaseMapLayers: [{
        Key: "parcelMap",
        ThumbnailSource: "images/parcelMap.png",
        Name: "Streets",
        MapURL: "http://arcgis-tenone2012-1974758903.us-west-1.elb.amazonaws.com/arcgis/rest/services/ParcelPublicAccess/MapServer"
    }, {
        Key: "hybridMap",
        ThumbnailSource: "images/imageryHybrid.png",
        Name: "Imagery",
        MapURL: "http://arcgis-tenone2012-1974758903.us-west-1.elb.amazonaws.com/arcgis/rest/services/ImageryHybrid/MapServer"
    }],

    // Initial map extent. Use comma (,) to separate values and don t delete the last comma.
    DefaultExtent: "-9816010,5123000,-9809970,5129500",


    // ------------------------------------------------------------------------------------------------------------------------
    // INFO-POPUP SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Info-popup is a popup dialog that gets displayed on selecting a feature

    //Field for Displaying the features as info window header.
    InfoWindowHeader: "NAME",

    // Set the content to be displayed on the info-Popup. Define labels, field values, field types and field formats.
    InfoPopupFieldsCollection: [{
        DisplayText: "Name:",
        FieldName: "NAME"
    }, {
        DisplayText: "Address:",
        FieldName: "FULLADDR"
    }, {
        DisplayText: "Contact:",
        FieldName: "CONTACT"
    }, {
        DisplayText: "Phone:",
        FieldName: "PHONE"
    }, {
        DisplayText: "Email:",
        FieldName: "EMAIL"
    }, {
        DisplayText: "Days Open:",
        FieldName: "OPERDAYS"
    }, {
        DisplayText: "Hours of Operation:",
        FieldName: "OPERHOURS"
    }],

    // Set size of the info-Popup - select maximum height and width in pixels.
    //minimum height should be 200 for the info-popup in pixels
    InfoPopupHeight: 200,

    //minimum width should be 300 for the info-popup in pixels
    InfoPopupWidth: 300,

    // Set string value to be shown for null or blank values.
    ShowNullValueAs: "N/A",

    // ------------------------------------------------------------------------------------------------------------------------
    // ADDRESS SEARCH SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set Locator service URL.

    LocatorSettings: {
        LocatorMarkupSymbolPath: "images/RedPushpin.png", // Set pushpin image path.
        MarkupSymbolSize: {
            width: 25,
            height: 25
        },
        Locators: [{
            DisplayText: "Search Address",
            DefaultValue: "139 W Porter Ave Naperville IL 60540", // Set default address to search.
            LocatorParamaters: ["SingleLine"], // Set Locator fields (fields to be used for searching).
            LocatorURL: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
            CandidateFields: "Loc_name, Score, Match_addr",
            DisplayField: "${Match_addr}",
            AddressMatchScore: 80,
            LocatorFieldName: 'Loc_name',
            LocatorFieldValues: ["USA.StreetName", "USA.PointAddress", "USA.StreetAddress"]
        }]
    },

    // ------------------------------------------------------------------------------------------------------------------------
    // GEOMETRY SERVICE SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set geometry service URL.
    GeometryService: "http://arcgis-tenone2012-1974758903.us-west-1.elb.amazonaws.com/arcgis/rest/services/Utilities/Geometry/GeometryServer",

    // ------------------------------------------------------------------------------------------------------------------------
    // DRIVING DIRECTIONS SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set URL for routing service (network analyst).
    RouteServiceURL: "http://tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route",

    // Set color for the route symbol.
    RouteColor: "#CC6633",

    // Set width of the route.
    RouteWidth: 4,

    // Set this to true to show directions on map
    SearchforDirections: true,

    // ------------------------------------------------------------------------------------------------------------------------
    // SETTINGS FOR INFO-PODS ON THE BOTTOM PANEL
    // ------------------------------------------------------------------------------------------------------------------------
    // Set width of the boxes in the bottom panel.
    InfoBoxWidth: 417,

    //Operational layer collection.
    Services: {
        EvacArea: {
            Name: "Evacuation Areas",
            Image: "images/EvacArea.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/8",
            FieldNames: [{
                Field: "Evacuation Areas: ${DESCRIPTION}"
            }, {
                Links: [{
                    DisplayText: "Website",
                    FieldName: "EVACURL",
                    type: "web"
                }]
            }],
            Color: "#FCD208",
            isRendererColor: true,
            LayerVisibility: true
        },
        FloodHarzards: {
            Name: "Flood Harzards",
            Image: "images/Flood.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/9",
            FieldNames: [{
                Field: "Flood Zone: ${FLOODZONE}"
            }],
            Color: "#FCD208",
            isRendererColor: true,
            LayerVisibility: true
        },
        Harzards: {
            Name: "Hazardous Facilities",
            Image: "images/HazardFacilities.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/0",
            distance: 4,
            FieldNames: [{
                FieldName: "NAME"
            }, {
                FieldName: "FULLADDR"
            }, {
                FieldName: "PHONE"
            }],
            LayerVisibility: true,
            ShowBeyondBuffer: true
        },
        Hospitals: {
            Name: "Hospitals",
            Image: "images/hospital.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/1",
            distance: 4,
            FieldNames: [{
                FieldName: "NAME"
            }, {
                FieldName: "FULLADDR"
            }, {
                FieldName: "PHONE"
            }],
            LayerVisibility: true,
            ShowBeyondBuffer: true
        },
        PoliceStations: {
            Name: "Police Stations",
            Image: "images/policeStations.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/2",
            distance: 4,
            FieldNames: [{
                FieldName: "NAME"
            }, {
                FieldName: "FULLADDR"
            }, {
                FieldName: "PHONE"
            }],
            LayerVisibility: true,
            ShowBeyondBuffer: true
        },
        FireStations: {
            Name: "Fire Stations",
            Image: "images/fireStations.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/3",
            distance: 4,
            FieldNames: [{
                FieldName: "NAME"
            }, {
                FieldName: "FULLADDR"
            }, {
                FieldName: "PHONE"
            }],
            LayerVisibility: true,
            ShowBeyondBuffer: true
        },
        CoolCenter: {
            Name: "Cooling Center",
            Image: "images/CoolCenter.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/4",
            distance: 4,
            FieldNames: [{
                FieldName: "FACNAME"
            }, {
                FieldName: "HOURSOPER"
            }, {
                FieldName: "CAPACITY"
            }],
            LayerVisibility: true,
            ShowBeyondBuffer: true
        },
        WarmCenter: {
            Name: "Warming Center",
            Image: "images/WarmCenter.png",
            HasRendererImage: false,
            ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/5",
            distance: 4,
            FieldNames: [{
                FieldName: "FACNAME"
            }, {
                FieldName: "HOURSOPER"
            }, {
                FieldName: "CAPACITY"
            }],
            LayerVisibility: true,
            ShowBeyondBuffer: true
        }
    },

    // ServiceUrl is the REST end point for the reference overlay layer
    // DisplayOnLoad setting this will show the reference overlay layer on load
    ReferenceOverlayLayer: {
        ServiceUrl: "http://ec2-54-214-140-9.us-west-2.compute.amazonaws.com:6080/arcgis/rest/services/MyGovServicesPublicSafety/MapServer/6",
        DisplayOnLoad: false
    },

    //Set required zoom level.
    ZoomLevel: 6,

    //Set Address to be displayed on mobile callout.
    CallOutAddress: "Street: ${Address}",

    //Set Renderer color for selected feature.
    RendererColor: "#CC6633",

    //Set size of the ripple.
    RippleSize: 25,

    // ------------------------------------------------------------------------------------------------------------------------
    // SETTINGS FOR MAP SHARING
    // ------------------------------------------------------------------------------------------------------------------------
    // Set URL for TinyURL service, and URLs for social media.
    MapSharingOptions: {
        TinyURLServiceURL: "http://api.bit.ly/v3/shorten?login=esri&apiKey=R_65fd9891cd882e2a96b99d4bda1be00e&uri=${0}&format=json",
        TinyURLResponseAttribute: "data.url",
        FacebookShareURL: "http://www.facebook.com/sharer.php?u=${0}&t=My%20Government%20Services",
        TwitterShareURL: "http://mobile.twitter.com/compose/tweet?status=My%20Government%20Services ${0}",
        ShareByMailLink: "mailto:%20?subject=Checkout%20this%20map!&body=${0}"
    }
});
