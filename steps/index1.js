new Vue({
    el: '#app',
    data: {
        apiUrl: 'http://restapi.thecommerceguy.com/api',
        startPageId: '',
        infoPageId: ``,
        title: 'Welcome to the Music Festival lab',
        heroImage: '',
        preamble: '',
        mainBody: '',
        artists: [],
        loadingArtists: false,
        currentLanguage: 'en',
        languages: [],
        currentFilter: "",
        filterOptions: [

        ],
        currentSort: '',
        sortOptions: [

        ]
    },
    created: function () {
        this.getSiteInfo();
        this.getArtists();
    },
    methods: {
        getSiteInfo: function () {

            var vm = this;

            axios.get(vm.apiUrl + '/episerver/site/', {
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response.data);

                    //Grab the first site in the list
                    var site = response.data[0];

                    //Store the Start Page ID, and call getStartPage
                    vm.startPageId = site.ContentRoots.StartPage.Id;
                    console.log('Stored startPageId: ' + vm.startPageId);
                    
                    vm.getStartPage();
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getStartPage: function () {

            var vm = this;

            axios.get(vm.apiUrl + '/episerver/content/' + vm.startPageId, {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en'
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    
                    //Store the MusicFestivalInfoPage property as infoPageId, and call getInfoPageContent
                    var startPage = response.data;
                    vm.infoPageId = startPage.MusicFestivalInfoPage.Value.Id;
                    console.log('Stored infoPageId: ' + vm.infoPageId);
                    vm.getInfoPageContent();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getInfoPageContent: function () {

            var vm = this;

        },
        getArtists: function () {

            var vm = this;

        },
        formatPerformanceTime: function(rawDate) {

            var vm = this;

            var date = new Date(rawDate);
            
            var options = {  
                weekday: "long", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit"  
            };  

            return date.toLocaleDateString(vm.currentLanguage, options)

        }
    }
});