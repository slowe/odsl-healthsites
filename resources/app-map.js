(function(root){

	if(!root.OI) root.OI = {};

	root.OI.ready = function(f){
		if(/in/.test(document.readyState)) setTimeout('OI.ready('+f+')',9);
		else f();
	};

	// Make a copy of a structure
	function clone(a){
		return JSON.parse(JSON.stringify(a));
	}

	// Extend objects
	extendObject = (typeof Object.extend === 'undefined') ?
		function(destination, source) {
			for (var property in source) {
				if (source.hasOwnProperty(property)) destination[property] = source[property];
			}
			return destination;
		} : Object.extend;

	// Define a shortcut for checking variable types
	function is(a,b){ return (typeof a == b) ? true : false; }
	function indexOfMax(arr) {
		if(arr.length === 0) return -1;

		var max = arr[0];
		var maxIndex = 0;

		for(var i = 1; i < arr.length; i++){
			if(arr[i] > max){
				maxIndex = i;
				max = arr[i];
			}
		}
		return maxIndex;
	}
	function getIcon(icon,colour,cls){
		if(icons[icon]) return icons[icon].replace(/%COLOR%/g,(colour||"black")).replace(/%CLASS%/g,(cls||""));
		else return icons.marker.replace(/%COLOR%/g,(colour||"black")).replace(/%CLASS%/g,(cls||""));
	}
	var icons = {
		'loader':'<svg version="1.1" width="64" height="64" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.11601 0 0 .11601 -49.537 -39.959)"><path d="m610.92 896.12m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.83333s" repeatCount="indefinite" /></path><path d="m794.82 577.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.6666s" repeatCount="indefinite" /></path><path d="m1162.6 577.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.5s" repeatCount="indefinite" /></path><path d="m1346.5 896.12m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.3333s" repeatCount="indefinite" /></path><path d="m1162.6 1214.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="-0.1666s" repeatCount="indefinite" /></path><path d="m794.82 1214.6m183.9-106.17-183.9-106.17-183.9 106.17v212.35l183.9 106.17 183.9-106.17z" fill="black"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.7;1" dur="1s" begin="0s" repeatCount="indefinite" /></path></g></svg>',
		'marker':'<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="7.0556mm" height="11.571mm" viewBox="0 0 25 41.001" id="svg2" version="1.1"><g id="layer1" transform="translate(1195.4,216.71)"><path style="fill:%COLOR%;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" d="M 12.5 0.5 A 12 12 0 0 0 0.5 12.5 A 12 12 0 0 0 1.8047 17.939 L 1.8008 17.939 L 12.5 40.998 L 23.199 17.939 L 23.182 17.939 A 12 12 0 0 0 24.5 12.5 A 12 12 0 0 0 12.5 0.5 z " transform="matrix(1,0,0,1,-1195.4,-216.71)" id="path4147" /><ellipse style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.428;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" id="path4173" cx="-1182.9" cy="-204.47" rx="5.3848" ry="5.0002" /></g></svg>',
		//'Surgery': '<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" width=\"512\" height=\"445\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" image-rendering=\"optimizeQuality\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" viewBox=\"0 0 512 444.66\"><path d=\"M240.19 78.15h31.61c5.9 0 10.74 4.83 10.74 10.74v34.38h34.38c5.9 0 10.74 4.83 10.74 10.74v31.61c0 5.91-4.84 10.74-10.74 10.74h-34.38v33.45c0 5.91-4.84 10.75-10.74 10.75h-31.61c-5.91 0-10.74-4.84-10.74-10.75v-33.45h-34.37c-5.9 0-10.74-4.83-10.74-10.74V134c0-5.91 4.84-10.75 10.74-10.75h34.38V88.89c0-5.91 4.82-10.74 10.73-10.74zm37.5 304.84a31.082 31.082 0 0 1-17.82 5.72c-5.76.01-11.54-1.55-16.63-4.78l-.08-.09c-15.89-10.11-30.56-21.25-43.86-33.11-13.77-12.2-26.17-25.35-37.07-39.07-14.75-18.49-26.83-38.07-36.07-57.99-9.43-20.39-15.92-41.33-19.24-62.03-3.47-21.51-3.53-42.6-.01-62.49 3.54-19.95 10.62-38.79 21.41-55.76 4.34-6.74 9.35-13.34 15.03-19.63 5.39-6.09 11.48-11.83 18.15-17.13 15.02-11.96 31.22-21.16 47.96-27.33 16.96-6.26 34.62-9.42 52.32-9.3 17.63.13 35.04 3.5 51.62 10.25 16.04 6.65 31.33 16.23 45.27 28.95 4.91 4.45 9.6 9.43 13.99 14.79 4.47 5.43 8.43 11.04 11.91 16.75 11.48 18.99 18.55 40.3 21.5 62.78 3.01 22.78 1.83 46.88-3.15 70.99-7.51 36.48-23.21 71.7-44.95 102.49-21.4 30.31-48.86 56.64-80.28 75.99zm-13.54-22.14c-2.46 1.8-5.8 2.04-8.53.29-29.52-18.79-54.35-41.36-73.82-65.85-26.89-33.74-43.84-71.15-49.63-107.18-5.9-36.53-.39-71.66 17.79-100.24 7.17-11.3 16.32-21.59 27.48-30.46 25.66-20.46 54.97-31.24 84.13-31.03 28.12.2 55.86 10.7 79.83 32.57 8.43 7.65 15.52 16.43 21.31 25.95 19.55 32.19 23.76 73.25 15.15 114.87-13.4 65.2-56.46 126.33-113.71 161.08zm208.57 55.65-36.95-108.46c-1.61-4.74-4.32-9.19-9.18-9.19h-20.68l13.86-28.15h6.82c11.58 0 20.32 4.92 26.92 12.49 4.29 4.91 7.05 10.47 8.88 15.83L512 444.66H0l44.38-144.87c2.03-6.49 5.46-13.25 10.69-18.48h.11c6.47-6.44 14.74-10.61 25.22-10.61h13.74l15.09 28.15H80.4c-4.87 0-7.77 4.57-9.18 9.19L37.98 416.5h434.74z\" fill=\"%COLOR%\" /></svg>',
//		'Dispensary': '<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" width=\"512\" height=\"445\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" image-rendering=\"optimizeQuality\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" viewBox=\"0 0 512 444.66\"><path d=\"M240.19 78.15h31.61c5.9 0 10.74 4.83 10.74 10.74v34.38h34.38c5.9 0 10.74 4.83 10.74 10.74v31.61c0 5.91-4.84 10.74-10.74 10.74h-34.38v33.45c0 5.91-4.84 10.75-10.74 10.75h-31.61c-5.91 0-10.74-4.84-10.74-10.75v-33.45h-34.37c-5.9 0-10.74-4.83-10.74-10.74V134c0-5.91 4.84-10.75 10.74-10.75h34.38V88.89c0-5.91 4.82-10.74 10.73-10.74zm37.5 304.84a31.082 31.082 0 0 1-17.82 5.72c-5.76.01-11.54-1.55-16.63-4.78l-.08-.09c-15.89-10.11-30.56-21.25-43.86-33.11-13.77-12.2-26.17-25.35-37.07-39.07-14.75-18.49-26.83-38.07-36.07-57.99-9.43-20.39-15.92-41.33-19.24-62.03-3.47-21.51-3.53-42.6-.01-62.49 3.54-19.95 10.62-38.79 21.41-55.76 4.34-6.74 9.35-13.34 15.03-19.63 5.39-6.09 11.48-11.83 18.15-17.13 15.02-11.96 31.22-21.16 47.96-27.33 16.96-6.26 34.62-9.42 52.32-9.3 17.63.13 35.04 3.5 51.62 10.25 16.04 6.65 31.33 16.23 45.27 28.95 4.91 4.45 9.6 9.43 13.99 14.79 4.47 5.43 8.43 11.04 11.91 16.75 11.48 18.99 18.55 40.3 21.5 62.78 3.01 22.78 1.83 46.88-3.15 70.99-7.51 36.48-23.21 71.7-44.95 102.49-21.4 30.31-48.86 56.64-80.28 75.99zm-13.54-22.14c-2.46 1.8-5.8 2.04-8.53.29-29.52-18.79-54.35-41.36-73.82-65.85-26.89-33.74-43.84-71.15-49.63-107.18-5.9-36.53-.39-71.66 17.79-100.24 7.17-11.3 16.32-21.59 27.48-30.46 25.66-20.46 54.97-31.24 84.13-31.03 28.12.2 55.86 10.7 79.83 32.57 8.43 7.65 15.52 16.43 21.31 25.95 19.55 32.19 23.76 73.25 15.15 114.87-13.4 65.2-56.46 126.33-113.71 161.08zm208.57 55.65-36.95-108.46c-1.61-4.74-4.32-9.19-9.18-9.19h-20.68l13.86-28.15h6.82c11.58 0 20.32 4.92 26.92 12.49 4.29 4.91 7.05 10.47 8.88 15.83L512 444.66H0l44.38-144.87c2.03-6.49 5.46-13.25 10.69-18.48h.11c6.47-6.44 14.74-10.61 25.22-10.61h13.74l15.09 28.15H80.4c-4.87 0-7.77 4.57-9.18 9.19L37.98 416.5h434.74z\" fill=\"%COLOR%\" /></svg>',
//		'Pharmacy': '<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" width=\"512\" height=\"445\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" image-rendering=\"optimizeQuality\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" viewBox=\"0 0 512 444.66\"><path d=\"M240.19 78.15h31.61c5.9 0 10.74 4.83 10.74 10.74v34.38h34.38c5.9 0 10.74 4.83 10.74 10.74v31.61c0 5.91-4.84 10.74-10.74 10.74h-34.38v33.45c0 5.91-4.84 10.75-10.74 10.75h-31.61c-5.91 0-10.74-4.84-10.74-10.75v-33.45h-34.37c-5.9 0-10.74-4.83-10.74-10.74V134c0-5.91 4.84-10.75 10.74-10.75h34.38V88.89c0-5.91 4.82-10.74 10.73-10.74zm37.5 304.84a31.082 31.082 0 0 1-17.82 5.72c-5.76.01-11.54-1.55-16.63-4.78l-.08-.09c-15.89-10.11-30.56-21.25-43.86-33.11-13.77-12.2-26.17-25.35-37.07-39.07-14.75-18.49-26.83-38.07-36.07-57.99-9.43-20.39-15.92-41.33-19.24-62.03-3.47-21.51-3.53-42.6-.01-62.49 3.54-19.95 10.62-38.79 21.41-55.76 4.34-6.74 9.35-13.34 15.03-19.63 5.39-6.09 11.48-11.83 18.15-17.13 15.02-11.96 31.22-21.16 47.96-27.33 16.96-6.26 34.62-9.42 52.32-9.3 17.63.13 35.04 3.5 51.62 10.25 16.04 6.65 31.33 16.23 45.27 28.95 4.91 4.45 9.6 9.43 13.99 14.79 4.47 5.43 8.43 11.04 11.91 16.75 11.48 18.99 18.55 40.3 21.5 62.78 3.01 22.78 1.83 46.88-3.15 70.99-7.51 36.48-23.21 71.7-44.95 102.49-21.4 30.31-48.86 56.64-80.28 75.99zm-13.54-22.14c-2.46 1.8-5.8 2.04-8.53.29-29.52-18.79-54.35-41.36-73.82-65.85-26.89-33.74-43.84-71.15-49.63-107.18-5.9-36.53-.39-71.66 17.79-100.24 7.17-11.3 16.32-21.59 27.48-30.46 25.66-20.46 54.97-31.24 84.13-31.03 28.12.2 55.86 10.7 79.83 32.57 8.43 7.65 15.52 16.43 21.31 25.95 19.55 32.19 23.76 73.25 15.15 114.87-13.4 65.2-56.46 126.33-113.71 161.08zm208.57 55.65-36.95-108.46c-1.61-4.74-4.32-9.19-9.18-9.19h-20.68l13.86-28.15h6.82c11.58 0 20.32 4.92 26.92 12.49 4.29 4.91 7.05 10.47 8.88 15.83L512 444.66H0l44.38-144.87c2.03-6.49 5.46-13.25 10.69-18.48h.11c6.47-6.44 14.74-10.61 25.22-10.61h13.74l15.09 28.15H80.4c-4.87 0-7.77 4.57-9.18 9.19L37.98 416.5h434.74z\" fill=\"%COLOR%\" /></svg>',
		'Surgery':'<svg width=\"30\" height=\"30\" viewBox=\"0 0 40 40\"><path d="M15,15 l0,-15 10,0 0,15 15,0 0,10 -15,0 0,15 -10,0 0,-15 -15,0 0,-10 15,0" fill=\"%COLOR%\"></path></svg>',
		'Dispensary':'<svg width=\"30\" height=\"30\" viewBox=\"0 0 40 40\"><path d="M15,15 l0,-15 10,0 0,15 15,0 0,10 -15,0 0,15 -10,0 0,-15 -15,0 0,-10 15,0" fill=\"%COLOR%\"></path></svg>',
		'Pharmacy':'<svg width=\"30\" height=\"30\" viewBox=\"0 0 40 40\"><path d="M15,15 l0,-15 10,0 0,15 15,0 0,10 -15,0 0,15 -10,0 0,-15 -15,0 0,-10 15,0" fill=\"%COLOR%\"></path></svg>'
	};
	var colours = {
		'Surgery': '#D73058',
		'Dispensary': '#722EA5',
		'Pharmacy': '#67E767'
	};


	baseMaps = {};
	// Default maps
	baseMaps['Greyscale'] = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		attribution: 'Tiles: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		subdomains: 'abcd',
		maxZoom: 19
	});
	baseMaps['Open Street Map'] = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
	baseMaps['CartoDB Voyager (no labels)'] = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
		subdomains: 'abcd',
		maxZoom: 19
	});
	baseMaps['CartoDB Voyager'] = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
		subdomains: 'abcd',
		maxZoom: 19
	});

	function HealthSites(opts){
		this.name = "HealthSites";
		this.version = "0.1";
		if(!opts) opts = {};
		this.log = new Logger({'id':this.name,'logging':(location.search.indexOf("logging=true")>=0)});
		var el = opts.el||document.getElementById('map');
		if(!el){
			this.log.error('No element found to attach map to');
			return this;
		}
		load = document.createElement('div');
		load.classList.add('loader');
		load.innerHTML = icons.loader;
		el.appendChild(load);

		this.selectedLayer = "Greyscale";

		var lat = 53.79659;
		var lon = -1.53385;
		var d = 2;
		var bbox = [[lat-d, lon-d],[lat+d, lon+d]];
		this.show = opts.show||{};
		
		this.map = L.map(el,{'layers':[baseMaps[this.selectedLayer]],'scrollWheelZoom':true,'editable': true,'zoomControl': true}).fitBounds(bbox);

		
		var _obj = this;

		this.data = {
			'healthsites': {
				'file':'data/healthsites_by_postcode.csv',
				'credit': 'Blah',
				'parserow': function(col){
					return { 'POSTCODE': col[0], 'ID': col[1], 'NAME': col[2], 'Type': col[3], 'LATITUDE': col[4], 'LONGITUDE': col[5] };
				},
				'onload': function(key,data){
					lnames = {};
					for(var i = 0; i < data.length; i++){
						//if(i < 100) console.log(i,e.data[i],e);
						if(!this.maplayers[data[i].Type]){
							this.maplayers[data[i].Type] = [];
							lnames[data[i].Type] = true;
						}
						this.maplayers[data[i].Type].push({'properties':{'name':data[i].NAME,'ID':data[i].ID,'POSTCODE':data[i].POSTCODE},'longitude':parseFloat(data[i].LONGITUDE),'latitude':parseFloat(data[i].LATITUDE)});
					}
					for(l in lnames){
						this.maplayers[l].credit = this.data[key].credit||"Something";
						
						this.buildMarkerLayer(l,this.maplayers[l],{
							'icon':this.maplayers[l].icon,
							'popupopen':function(e,opts){
								
								console.log(this,e,opts);
								str = '<h3>'+opts.properties.name+'</h3><p>ID: '+opts.properties.ID+'</p><p>Type: '+opts.key+'</p>';
								e.popup.setContent(str);
								return '';
							},
							'clusterhtml': function(key,pins){
								return '<div class="marker-group" style="background-color:'+(colours[key]||'black')+';"><span>'+pins.length+'</span></div>';
							},
							'this': this
						});
					}
					this.updateCredits();
					L.control.layers(baseMaps, this.nodegroup).addTo(this.map);


				}
			}
		}

		this.maplayers = {};

		this.loadCSVFile('healthsites');

		return this;
	}
	HealthSites.prototype.buildMarkerLayer = function(key,markers,opts){
		if(!this.nodegroup) this.nodegroup = {};
		this.nodegroup[key] = [];

		// Loop over markers building them as necessary
		for(var m = 0; m < markers.length; m++) markers[m].icon = makeMarker(key||'marker',colours[key]||'black');

		var id,t,str,markerList,color,customicon,nodes,taglist,p;


		// Define the custom background colour for the group
		color = 'white';

		nodes = L.markerClusterGroup({
			chunkedLoading: true,
			maxClusterRadius: 50,
			iconCreateFunction: function (cluster){
				var pins = cluster.getAllChildMarkers();
				var html = (typeof opts.clusterhtml==="function") ? opts.clusterhtml.call(opts.this,key,pins) : '<div class="marker-group" style="background:black;color:white;">'+pins.length+'</div>';
				return L.divIcon({ html: html, className: '',iconSize: L.point(30, 30)  });
			},
			// Disable all of the defaults:
			spiderfyOnMaxZoom: true,
			showCoverageOnHover: false,
			zoomToBoundsOnClick: true
		});

		// Remove the previous cluster group
		if(this.nodegroup[key]) this.map.removeLayer(this.nodegroup[key]);

		// Build marker list
		markerList = [];
		
		var _obj = this;

		for(var m = 0; m < markers.length; m++){
			if(markers[m] && typeof markers[m].longitude==="number" && typeof markers[m].latitude==="number"){

				if(markers[m].longitude!==NaN && markers[m].latitude!==NaN){
					try {
						marker = L.marker([markers[m].latitude,markers[m].longitude],{'icon':markers[m].icon,'properties':{'m':m,'properties':markers[m].properties,'key':key}}).on('popupopen', function(e,l){
							if(typeof opts.popupopen==="function") opts.popupopen.call(opts['this']||this,e,this.options.properties);
						}).on('popupclose',function(e){
							if(typeof opts.popupclose==="function") opts.popupclose.call(opts['this']||this,e,this.options.properties);
						});						
						marker.props = {'m':m,'id':markers[m].shortid};
					}catch(err){
						console.error(err,m,markers[m]);
					}

					if(!marker.properties) marker.properties = {};
					marker.properties.background = (markers[m] ? markers[m].background : "black");
					marker.bindPopup('<h3>'+(markers[m].id||"Node")+'</h3>',{'icon':markers[m].icon});
					markerList.push(marker);
					
				}else{
					console.warn('Warning',m,markers[m]);
				}
			}else{
				this.log.warning('Unable to add node: '+id);
			}
		}

		// Add all the markers we've just made
		nodes.addLayers(markerList);
		this.map.addLayer(nodes);


		// Save a copy of the cluster group
		this.nodegroup[key] = nodes;


	};

	HealthSites.prototype.loadCSVFile = function(key,cb){
		
		var _obj = this;
		if(typeof cb!=="function") cb = this.data[key].onload;
		
		fetch(this.data[key].file).then(response => {
			if(!response.ok) throw new Error('Network response was not OK');
			return response.text();
		}).then(txt => {
			lines = txt.split(/[\n\r]+/);
			rows = [];
			for(var r = 1; r < lines.length; r++){
				row = lines[r].split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);
				if(row[0]) rows.push(_obj.data[key].parserow.call(this,row)||{'id':row[0]});
			}
			this.data[key].data = rows;
			if(typeof cb==="function") cb.call(this,key,this.data[key].data);
			this.updateCredits();
		}).catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
		});

		return this;
	}
	
	HealthSites.prototype.updateCredits = function(){
		var attrib = '';
		var done = {};
		for(var l in this.maplayers){
			if(this.maplayers[l].credit && !done[this.maplayers[l].credit]){
				attrib += (attrib ? ', ':'')+this.maplayers[l].credit;
				done[this.maplayers[l].credit] = 1;
			}
		}
		this.map.attributionControl.setPrefix(attrib ? '<span class="AttributionClass">'+attrib+'</span>':'');
	}

	function makeMarker(icon,colour,cls){
		return L.divIcon({
			'className': '',
			'html':	getIcon(icon,colour,cls),
			'iconSize':	 [30, 30],
			'iconAnchor': [15, 30] ,
			'popupAnchor': [0, -30]
		});
	}

	function hasClass(el,cls){
		for(var i = 0; i < el.classList.length; i++){
			if(el.classList[i] == cls) return true;
		}
		return false;
	}

	// Define a function to get user location
	function GeoLocation(options){
		if(!options) options = {};
		if(!options.mapper) return {};
		this.locating = false;
		this.log = new Logger({'id':'GeoLocation','logging':options.mapper.log.logging});

		var _obj = this;

		this.setLocation = function(p){

			var btn = document.getElementsByClassName('leaflet-control-geolocate')[0];
			this.log.message('setLocation',p,btn,hasClass(btn,'live-location'));

			if(!this.locating){
				this.p = null;
				navigator.geolocation.clearWatch(this.watchID);
				btn.classList.remove('live-location');
				this.marker.remove();
				this.marker = null;
				clearTimeout(this.check);
				return;
			}

			lat = p.coords.latitude;
			lon = p.coords.longitude;
			this.p = p;
			var a = Math.round(2*options.mapper.m2px(p.coords.accuracy,lat));

			btn.classList.add('live-location');
			if(!this.marker){
				var s = 10;
				var ico = L.divIcon({ html: '<div class="my-location-accuracy" style="width:'+a+'px;height:'+a+'px"></div>', 'className':'my-location', 'iconSize': L.point(s, s) });
				this.marker = L.marker([lat, lon],{icon:ico});
				this.marker.addTo(options.mapper.map);
				var _obj = this;
				options.mapper.map.on('zoomend', function() {
					_obj.setLocation(_obj.p,false);
				});
			}else{
				this.marker.setLatLng([lat, lon]).update();
				var el = document.querySelector('.my-location-accuracy');
				if(el){
					el.style.width = a+'px';
					el.style.height = a+'px';
				}
			}

			if(!this.centred){
				// We want to centre the view and update the nodes
				options.mapper.map.panTo(new L.LatLng(lat, lon))
//				options.mapper.getNodes(options.mapper.node.type,options.mapper.node.options);
				this.centred = true;
			}
			options.mapper.trigger('geoend',{'this':this});

		}

		if("geolocation" in navigator){

			// We need a function that checks how live the position is
			// that runs independently of the geolocation api
			this.updateLive = function(){
				console.log('GeoLocation check',this.p);
				if(this.p){
					var ago = ((new Date())-this.p.timestamp)/1000;
					if(ago > 10) document.getElementsByClassName('leaflet-control-geolocate')[0].classList.remove('live-location');
				}
			}

			var _obj = this;

			this.control = L.Control.extend({
				"options": { position: 'topleft' },
				"onAdd": function (map){

					_obj.log.message('control onAdd',map)

					var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-geolocate');
					container.innerHTML = '<a href="#">'+getIcon('geo','black')+'</a>';
					container.onclick = function(e){

						e.preventDefault();
						_obj.centred = false;
						_obj.locating = !_obj.locating;

						if(_obj.locating){
							options.mapper.trigger('geostart',{'this':this});
							//if(options.mapper.callbacks && options.mapper.callbacks.geostart) options.mapper.callbacks.geostart.call(this);

							// Start watching the user location
							_obj.watchID = navigator.geolocation.watchPosition(function(position){
								_obj.setLocation(position);
							},function(){
								_obj.log.error("Sorry, no position available.");
							},{
								enableHighAccuracy: true, 
								maximumAge		: 30000, 
								timeout		   : 27000
							});

							// Create a checker to see if the geolocation is live
							_obj.check = setInterval(function(){ _obj.updateLive(); },10000);

						}else{

							_obj.setLocation();

						}
					}
					return container;
				}
			});

			options.mapper.map.addControl(new _obj.control());

		}else{

			this.log.warning('No location services available');

		}

		return this;
	}
	function getCentroid2(arr){
		var twoTimesSignedArea = 0;
		var cxTimes6SignedArea = 0;
		var cyTimes6SignedArea = 0;

		var length = arr.length

		var x = function (i) { return arr[i % length][0] };
		var y = function (i) { return arr[i % length][1] };

		for ( var i = 0; i < arr.length; i++) {
			var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
			twoTimesSignedArea += twoSA;
			cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
			cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
		}
		var sixSignedArea = 3 * twoTimesSignedArea;
		return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];        
	}
	function Tiler(){
		var R = 6378137, sphericalScale = 0.5 / (Math.PI * R);

		function tile2lon(x,z){ return (x/Math.pow(2,z)*360-180); }
		function tile2lat(y,z){ var n=Math.PI-2*Math.PI*y/Math.pow(2,z); return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n)))); }

		/* Adapted from: https://gist.github.com/mourner/8825883 */
		this.xyz = function(bounds, z) {

			var min = project(bounds._northEast.lat,bounds._southWest.lng, z);//north,west
			var max = project(bounds._southWest.lat,bounds._northEast.lng, z);//south,east
			var tiles = [];
			var x,y;
			for(x = min.x; x <= max.x; x++) {
				for(y = min.y; y <= max.y; y++) {
					tiles.push({
						x: x,
						y: y,
						z: z,
						b: {'_northEast':{'lat':tile2lat(y,z),'lng':tile2lon(x+1,z)},'_southWest':{'lat':tile2lat(y+1,z),'lng':tile2lon(x,z)}}
					});
				}
			}
			return tiles;
		}

		/* 
		Adapts a group of functions from Leaflet.js to work headlessly
		https://github.com/Leaflet/Leaflet
		*/
		function project(lat,lng,zoom) {
			var d = Math.PI / 180,
			max = 1 - 1E-15,
			sin = Math.max(Math.min(Math.sin(lat * d), max), -max),
			scale = 256 * Math.pow(2, zoom);

			var point = {
				x: R * lng * d,
				y: R * Math.log((1 + sin) / (1 - sin)) / 2
			};

			point.x = tiled(scale * (sphericalScale * point.x + 0.5));
			point.y = tiled(scale * (-sphericalScale * point.y + 0.5));

			return point;
		}

		function tiled(num) {
			return Math.floor(num/256);
		}
		return this;
	}
	
	// Define a logging function
	function Logger(inp){
		if(!inp) inp = {};
		this.logging = (inp.logging||false);
		this.logtime = (inp.logtime||false);
		this.id = (inp.id||"JS");
		this.metrics = {};
		return this;
	}
	Logger.prototype.error = function(){ this.log('ERROR',arguments); };
	Logger.prototype.warning = function(){ this.log('WARNING',arguments); };
	Logger.prototype.info = function(){ this.log('INFO',arguments); };
	Logger.prototype.message = function(){ this.log('MESSAGE',arguments); }
	Logger.prototype.log = function(){
		if(this.logging || arguments[0]=="ERROR" || arguments[0]=="WARNING" || arguments[0]=="INFO"){
			var args,bold;
			args = Array.prototype.slice.call(arguments[1], 0);
			bold = 'font-weight:bold;';
			if(console && typeof console.log==="function"){
				if(arguments[0] == "ERROR") console.error('%c'+this.id+'%c:',bold,'',...args);
				else if(arguments[0] == "WARNING") console.warn('%c'+this.id+'%c:',bold,'',...args);
				else if(arguments[0] == "INFO") console.info('%c'+this.id+'%c:',bold,'',...args);
				else console.log('%c'+this.id+'%c:',bold,'',...args);
			}
		}
		return this;
	}
	Logger.prototype.time = function(key){
		if(!this.metrics[key]) this.metrics[key] = {'times':[],'start':''};
		if(!this.metrics[key].start) this.metrics[key].start = new Date();
		else{
			var t,w,v,tot,l,i,ts;
			t = ((new Date())-this.metrics[key].start);
			ts = this.metrics[key].times;
			// Define the weights for each time in the array
			w = [1,0.75,0.55,0.4,0.28,0.18,0.1,0.05,0.002];
			// Add this time to the start of the array
			ts.unshift(t);
			// Remove old times from the end
			if(ts.length > w.length-1) ts = ts.slice(0,w.length);
			// Work out the weighted average
			l = ts.length;
			this.metrics[key].av = 0;
			if(l > 0){
				for(i = 0, v = 0, tot = 0 ; i < l ; i++){
					v += ts[i]*w[i];
					tot += w[i];
				}
				this.metrics[key].av = v/tot;
			}
			this.metrics[key].times = ts.splice(0);
			if(this.logtime) this.info(key+' '+t+'ms ('+this.metrics[key].av.toFixed(1)+'ms av)');
			delete this.metrics[key].start;
		}
		return this;
	};
	
	root.OI.HealthSites = function(opts){
		return new HealthSites(opts);
	}
	root.Logger = Logger;

})(window || this);