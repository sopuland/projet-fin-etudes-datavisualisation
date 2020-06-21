import React from 'react';
import * as d3 from 'd3';
import dataCsv from './data.csv';
import "./BarChart.css";

import { Segment } from 'semantic-ui-react';

class BarChart extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: "all"
        } 
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    _changeState = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    draw = () => {       
        const margin = {top: 20, right: 20, bottom: 90, left: 60};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0]);

        var svg = d3.select("#barchart")
        svg.selectAll("*").remove()
        svg = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("fill", "#6baed6")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const div = d3.select("#tooltip")
            .attr("class", "tooltip")         
            .style("opacity", 0);

            // On demande à D3JS de charger notre fichier
d3.csv(dataCsv).then((data) => {
    data.forEach((d) => {
        d.count = +d.count;    // Conversion des caractères en nombres
    }); 

    var newData = [];
        if(this.state.selected === "cars"){
            newData = data.filter((d) => {
                return (d.category === "cars");
            })
        }
        else if(this.state.selected === "trucks"){
            newData = data.filter((d) => {
                return (d.category === "trucks");
            })        
        }
        else if(this.state.selected === "all"){
            newData = data.filter((d) => {
                return (d.category);
            })
        }
    
    


    // Mise en relation du scale avec les données de notre fichier
    // Pour l'axe X, c'est la liste des pays
    // Pour l'axe Y, c'est le max des populations
    x.domain(newData.map(function(d) { return d.month; }));
    y.domain([0, d3.max(newData, function(d) { return d.count; })]);
    
    // Ajout de l'axe X au SVG
    // Déplacement de l'axe horizontal et du futur texte (via la fonction translate) au bas du SVG
    // Selection des noeuds text, positionnement puis rotation
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
    
    // Ajout de l'axe Y au SVG avec 6 éléments de légende en utilisant la fonction ticks (sinon D3JS en place autant qu'il peut).
    svg.append("g")
        .call(d3.axisLeft(y).ticks(6));

    // Ajout des bars en utilisant les données de notre fichier data.tsv
    // La largeur de la barre est déterminée par la fonction x
    // La hauteur par la fonction y en tenant compte de la population
    // La gestion des events de la souris pour le popup
    svg.selectAll(".bar")
        .data(newData)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.month); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); })					
            .on("mouseover", function(d) {
                div.transition()        
                    .duration(200)      
                    .style("opacity", 1);
                div.html("Nombre de véhicules : " + d.count)
                    .style("right", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });
    }


    render() {

        return (


            <div>
                <Segment raised>
                <div className="barchart-container">
                    <div className="inline">

                        <h3>Filtres :</h3>

                        <select className="ui dropdown" onChange={this._changeState}>
                            <option value="all">Tous les véhicules</option>
                            <option value="cars">Voitures</option>
                            <option value="trucks">Camions</option>
                        </select>

                    </div>

                    <h3 className="center">Nombre de véhicules / mois</h3>

                    <div id="tooltip"><svg id="barchart"></svg></div>

                </div>
                 
                </Segment>

            </div>


            
        );
    }
}

export default BarChart;