
R3JS.element.constructors.triangles = function(
    plotobj,
    plotdims
    ){

    // Make the object
    var element = new R3JS.element.Triangles({
        vertices   : plotobj.vertices,
        properties : plotobj.properties
    });
    
    // Return the object
    return(element);

}

// Sphere object
R3JS.element.Triangles = class Triangles extends R3JS.element.base {

    // Object constructor
    constructor(args){

        // Set defaults
        if(args.properties === undefined)         args.properties           = {};
        if(args.properties.color === undefined)   args.properties.color     = {r:0,g:0,b:0,a:1};
        if(args.properties.opacity !== undefined) args.properties.color.a   = args.properties.opacity;

        super();

        // Make geometry
        var positions = new Float32Array( args.vertices.length * 3 );
        var colors    = new Float32Array( args.vertices.length * 3 );

        // Add vertices and colors
        for(var i=0; i<args.vertices.length; i++){

            positions[i*3 + 0] = args.vertices[i][0]; // - object.position.x,
            positions[i*3 + 1] = args.vertices[i][1]; // - object.position.y,
            positions[i*3 + 2] = args.vertices[i][2]; // - object.position.z

            colors[i*3 + 0] = args.properties.color.r[i*3];
            colors[i*3 + 1] = args.properties.color.r[i*3];
            colors[i*3 + 2] = args.properties.color.r[i*3];

        }

        // Set fill material
        var material = R3JS.Material(args.properties);
        material.vertexColors = THREE.VertexColors;
        material.color = new THREE.Color();

        // Create buffer geometry
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ));
        geometry.setAttribute( 'color',    new THREE.BufferAttribute( colors,    3 ));
        geometry.computeVertexNormals();

        material.vertexColors = THREE.VertexColors;
        material.color = new THREE.Color();

        // Make fill object
        this.object = new THREE.Mesh(geometry, material);

    }

}

