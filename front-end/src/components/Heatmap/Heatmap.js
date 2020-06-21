import React, { Component } from 'react';
import * as d3 from "d3";
import data from './Heatmap2.csv';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import './Heatmap.css'; 

class Heatmap extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hoursViewSelection: "Day",
        daysViewSelection: "Working Days",
        categoryViewSelection: "All",
        categories: "All"
      }; 
    }
   
                            //**************************//
                            //******CYCLES DE VIE*******// 
                            //**************************//

// au chargement de la page, afficher la fonction _drawHeatmap()
    componentDidMount() {
        this._drawHeatmap()
    };

// fait le ménage dans le DOM 
    componentDidUpdate() {
        this._drawHeatmap()
    };

    
                            //***************************//
                            //**DEFINITION DE FONCTIONS**// 
                            //***************************//


// FONCTION POUR CHANGER LES STATES en fonction de la sélection choisie par le user 

    _changeHours = (e) => {
        this.setState({
            hoursViewSelection: e.target.value, 
        })
    }

    _changeDays = (e) => {
        this.setState({
            daysViewSelection: e.target.value, 
        })
    }

    _changeCategory = (e) => {
        this.setState({
            categoryViewSelection: e.target.value, 
            categories: e.target.value,
        })
    }

// FONCTION CREATION DE LA HEATMAP 

    _drawHeatmap = () => {

    // Initialisation des variables

        var days = []
        var times = d3.range()
        var margin; 

        // Conditions d'affichage en fonction du choix du user 

            // Selecteur 'Hours'
            if (this.state.hoursViewSelection === "Day") {
                times = d3.range(8,21,1)
            }

            else if (this.state.hoursViewSelection === "All") {
                times = d3.range(24)
            }

            // Selecteur 'Days'
            if (this.state.daysViewSelection === "Working Days") {
                days = ["Lu", "Ma", "Me", "Je", "Ve"]
            }

            else if (this.state.daysViewSelection === "All") {
                days = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"]
            }

        // Initialisation du positionnement et de la taille de la heatmap 

            margin = {
                top: 90,
                right: 50,
                bottom: 100,
                left: 100
            };

            let width = Math.max(Math.min(window.innerWidth,800), 500) - margin.left - margin.right,
            gridSize = Math.floor(width / times.length),
            height = gridSize * days.length;

        // Construction du SVG 

            var maingroup = d3.select('svg');
            
            maingroup.selectAll("*").remove(); // Supprime tous les sélecteurs d3 pour le réinitialiser à chaque sélection 

            maingroup = maingroup.attr("class", "svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Création des axes 

            var dayLabels = maingroup.selectAll(".dayLabel")
            .data(days)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .attr("transform", "translate(-6," + gridSize / 2 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel axis-workweek" : "dayLabel"); })
            .style("text-anchor", "end");

            var timeLabels = maingroup.selectAll(".timeLabel")
            .data(times)
            .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 9 && i <= 19) ? "timeLabel axis-worktime" : "timeLabel"); })
            .style("text-anchor", "middle");



        // Ajouter du titre et du crédit 

            maingroup.append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", -70)
            .style("text-anchor", "middle")
            .text("Nombre de véhicules au péage n°7");
        
            maingroup.append("text")
            .attr("class", "credit")
            .attr("x", width/2)
            .attr("y", gridSize * (days.length+1) + 80)
            .style("text-anchor", "middle")

        // Dire que day, hour et count sont des numbers et non des strings 

            d3.csv(data).then((data) =>  {
                data.forEach(function(d) {
                    d.day = +d.day;
                    d.hour = +d.hour;
                    d.count = +d.count;
                });

        // Filtre 'Hours' 
 

        if (this.state.hoursViewSelection === "Day") {
            data = data.filter( (d) => {
                return (d.hour>7 && d.hour<21); 
            });
        }


        // Filtre 'Days' 


        if (this.state.daysViewSelection === "Working Days") {
            data = data.filter( (d) => {
                return (d.day<5); 
            });
        }

        // Filtre 'Category'
        

        if (this.state.categoryViewSelection === "Cars") {
            data = data.filter( (d) => {
                return (d.category === "cars"); 
            });
        }  

        else if (this.state.categoryViewSelection === "Trucks") {
            data = data.filter( (d) => {
                return (d.category === "trucks"); 
            });
        } 

        else if (this.state.categoryViewSelection === "Motorbikes") {
            data = data.filter( (d) => {
                return (d.category === "motorbikes"); 
            });
        } 

        console.log(data); 

        // Ajoût de texte affichant le total des véhicules 

            maingroup.append("text")
            .attr("class", "subtitle")
            .attr("x", width / 2)
            .attr("y", -40)
            .style("text-anchor", "middle")
            .text("Février 2019 - Nombre de véhicules: " + d3.sum(data, function(d) {return d.count; }) + " - Type: " + this.state.categories);
        
        // Echelle des couleurs

            var colorScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {return d.count; }) / 2, d3.max(data, function(d) {return d.count; })])
            .range(["#f7fbff", "#6baed6", "#08306b"]);

        // Construction de la heatmap
            
            var mouseover = (d) => {
                tooltip.style("display", "block")
            }

            var mousemove = function(d) {
            tooltip
                .html("Nombre de véhicules" + " " + d.count)
                .style("left", (d3.mouse(this)[0] -1) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
            }

            var mouseleave = function(d) {
                tooltip.style("display", "none")
            }

            var heatMap = maingroup.selectAll(".hour")
            .data(data)
            .enter().append("rect")
            .attr("x", (d) => { 
                if (this.state.hoursViewSelection === "Day") {
                return (d.hour -8) * gridSize;
                }
                else {
                return d.hour * gridSize; 
                }

            })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
                
            .attr("y", function(d) { return (d.day) * gridSize; })
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("stroke", "white")
            .style("stroke-opacity", 0.6)
            .style("fill", function(d) { return colorScale(d.count); 
                
            });

            // Création d'un tooltip
            var tooltip = d3.select("#tooltip")
            .append("div")
            .attr("class", "tooltip") 
            .style("display", "none")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position", "absolute")
            

            // Création d'une légende continue

            var countScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {return d.count; })])
            .range([0, width])

            var numStops = 3;
            var countPoint = [0, d3.max(data, function(d) {return d.count; }) / 2, d3.max(data, function(d) {return d.count; })];

            maingroup.append("defs")
            .append("linearGradient")
            .attr("id", "legend-traffic")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "100%").attr("y2", "0%")
            .selectAll("stop") 
            .data(d3.range(numStops))                
            .enter().append("stop") 
                .attr("offset", function(d,i) { 
                    return countScale(countPoint[i]) / width;
                })   
                .attr("stop-color", function(d,i) { 
                    return colorScale(countPoint[i]); 
                });

            var legendWidth = Math.min(width * 0.8, 400);
                
            var legendsvg = maingroup.append("g") // groupe principal
            .attr("class", "legendWrapper")
            .attr("transform", "translate(" + (width/2) + "," + (gridSize * days.length + 40) + ")");

            legendsvg.append("rect") // rectangle avec gradient
            .attr("class", "legendRect")
            .attr("x", -legendWidth/2)
            .attr("y", 0)
            .attr("width", legendWidth)
            .attr("height", 10)
            .style("fill", "url(#legend-traffic)");
                
            legendsvg.append("text") // légende
            .attr("class", "legendTitle")
            .attr("x", 0)
            .attr("y", -10)
            .style("text-anchor", "middle")
            .text("Légende : Nombre de véhicules");

            var xScale = d3.scaleLinear() // scale pour x-axis
            .range([-legendWidth / 2, legendWidth / 2])
            .domain([ 0, d3.max(data, function(d) { return d.count; })] );

            legendsvg.append("g") // x axis
            .attr("class", "axis")
            .attr("transform", "translate(0," + (10) + ")")
            .call(d3.axisBottom(xScale).ticks(5));

            });
        
        }


    render() {
        return (
            
        <div className='container'>
            <Segment raised>
            <div className='container-heatmap'>
                <div className="inline">

                <h3>Filtres :</h3>
                
                    <div className='menuhours filters'>
                        <select className="ui dropdown" onChange={this._changeHours} >
                            <option value="Day">Journée (8h / 20h)</option>
                            <option value="All">24 heures</option>
                        </select>
                    </div>

                    <div className='menudays filters'>
                        <select className="ui dropdown" onChange={this._changeDays} >
                            <option value="Working Days">Semaine uniquement</option>
                            <option value="All">Tous les jours</option>
                        </select>
                    </div>

                    <div className='menucategory filters'>
                        <select className="ui dropdown" onChange={this._changeCategory} >
                            <option value="All">Tous véhicules</option>
                            <option value="Cars">Voitures</option>
                            <option value="Trucks">Camions</option>
                            <option value="Motorbikes">Motos</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="heatmap">
                <div id="tooltip"></div> 
                <svg></svg>  
            </div>

            </Segment>
        </div>
        )
    }
}

  export default Heatmap;