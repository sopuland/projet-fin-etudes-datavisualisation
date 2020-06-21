import React, { Component } from 'react';
import * as d3 from 'd3';
import dataCsv from './data.csv'
import { Grid, Segment, Icon, Menu, Dropdown, Select } from 'semantic-ui-react';

class LineChart extends React.Component {
    constructor() {
        super();
        this.state = {

        } 
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw = () => {        
        const margin = {top: 50, right: 10, bottom: 100, left: 40};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0]);

        const line = d3.line()
        .x(function(d) { return(x(d.month)); })
        .y(function(d) { return(y(d.count)); });

        const svg = d3.select("#linechart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("fill", "red")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const div = d3.select("#tool")
            .attr("class", "tool")         
            .style("opacity", 0);

            // On demande à D3JS de charger notre fichier
d3.csv(dataCsv).then((data) => {
    // Conversion des caractères en nombres
    data.forEach(function(d) {
        d.count = +d.count;
    });

    // Mise en relation du scale avec les données de notre fichier
    // Pour l'axe X, c'est la liste des pays
    // Pour l'axe Y, c'est le max des populations
    x.domain(data.map(function(d) { return d.month; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);
    
    // Ajout de l'axe X
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
    // Ajout de l'axe Y et du texte associé pour la légende
    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Nombre de véhicules");

     // Ajout de la grille horizontale (pour l'axe Y donc). Pour chaque tiret (ticks), on ajoute une ligne qui va 
    // de la gauche à la droite du graphique et qui se situe à la bonne hauteur.
    svg.selectAll("y axis").data(y.ticks(10)).enter()
    .append("line")
    .attr("class", "horizontalGrid")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", function(d){ return y(d);})
    .attr("y2", function(d){ return y(d);});
    
    // Ajout du path
    svg.append("path")
    .datum(data)
    .attr("stroke", "#000000")
    .attr("stroke-weight", 2.5)
    .attr("fill", "none")
    .attr("d", line);

    });
}


    render() {

        return (

            <div>
                <Segment raised>
                <h3 className="center">Nombre de véhicules / mois</h3>
                    <svg id="linechart">
                    <div id="tool"></div>
                    </svg>
                </Segment>
            </div>
            
        );
    }
}

export default LineChart;

