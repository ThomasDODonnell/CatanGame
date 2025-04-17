

const svgNS = "http://www.w3.org/2000/svg";

function getHexVerticies(r){
    // r is the radius of the circle the hed is inscribed in
    // basically r is size
    let verticies = []; // for when we do offsets we need tuples of ints
    // let verticies = "";
    for (let i =0; i < 6; i++){
        // let x = center[i] + Math.sin(((Math.PI * i)/3)) * r;
        // let y = center[i+1] + Math.cos(((Math.PI * i)/3)) * r;
        let x = Math.sin(((Math.PI * i)/3)) * r;
        let y = Math.cos(((Math.PI * i)/3)) * r;
        // if (i === 0) {
        //     verticies += `${x},${y}`;
        // } else {
        //     verticies += ` ${x},${y}`;
        // }
        verticies.push([x, y]);
    }
    return verticies;
}

function drawHex(verticies){
    let hex = document.createElementNS(svgNS, "polygon");
    hex.setAttribute("points", verticies.map(v => `${v[0]},${v[1]}`).join(' '));
    hex.setAttribute("fill", '#7CFC00');
    hex.setAttribute("stroke", "black");
    hex.setAttribute("stroke-width", "2");
    return hex;
}

function getHexSize(height, width){
    let r;
    if(height <= width){
        r = (height/10) * .1;
    }
    else{
        r = (width/10) * .1;
    }
    
    console.log(`R: ${r}`)

    return r;
}

function getHexCenters(r){
    // const center = [width/2, height/2];
    let y_offset = r/10;
    let x_offset = Math.sqrt((3 * (y_offset ** 2))/4);

    let centers = [];
    
    //Leftmost
    let first = [];
    for(let i=1; i < 4; i++){
        let y = (i + 1) * (Math.sqrt(3) * r);
        let x = (3/2) * r;
        first.push([x, y]);
    }

    let second = []; 
    for(let i = 0; i < 4 ; i++){
        let y = (i+1) * (Math.sqrt(3) * r) + ((Math.sqrt(3) * r)/2);
        let x = 2 * (3/2) * r;
        second.push([x, y]);
    }

    let third = [];
    for(let i = 0; i < 5; i++){
        let y = ((2*i) + 1) * r; 
        let x = (5 * r);
        third.push([x, y])
    }

    let fourth = []; 
    for(let i = 0; i < 4 ; i++){
        let y = ((2*i) + 1) * r + r; 
        let x = (7 * r);
        fourth.push([x, y]);
    }

    let fifth = []
    for(let i=1; i < 4; i++){
        let y = ((2*i) + 1) * r;
        let x = (9 * r);
        fifth.push([x, y]);
    }


    let all = [];
    all.push(...first, ...second, ...third, ...fourth, ...fifth);

    return all;

}

function drawAllHexes(r, centers, mother_svg){
    // Change this to loop through a list
    for(let i=0; i<3; i++){
        let verticies = getHexVerticies(r);
        let hex = drawHex(verticies);
        // let center_str = `${centers[i][0]}, ${centers[i][1]}`
        hex.setAttribute("transform", `translate(${centers[i][0]}, ${centers[i][1]}) rotate(60)`)
        mother_svg.appendChild(hex);
    }
}

function drawBoard(height, width){
    // Create mother SVG
    const mother_svg = document.createElementNS(svgNS, "svg");
    mother_svg.setAttribute("width", `${width}`);
    mother_svg.setAttribute("height", `${height}`);
    mother_svg.setAttribute("viewBox", `0 0 ${width} ${height}`);


    // insert the mother svg into the DOM
    const container = document.getElementById('board-container');
    container.appendChild(mother_svg);

    let r = getHexSize(height, width);
    

}

export { drawBoard };