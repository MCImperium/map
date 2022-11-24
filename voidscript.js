//Compatible with MET Version 1.3.3
//Created by MattiBorchers

	//variables
if ( true ) {
	
	var path = arguments[0];
	var shiftLatitude = parseInt(arguments[1].substring(1));
	var shiftLongitute = parseInt(arguments[2].substring(1));
	var settingsMapVersion = arguments[3];
	var tile = arguments[4].substring(1);
	var verticalScale = parseInt(arguments[5]);

	print(path);
	print(shiftLatitude);
	print(shiftLongitute);
	print(settingsMapVersion);
	print(tile);
}

	//layers
if ( true ) {
	
	var biomesLayer = wp.getLayer().withName("Biomes").go();
	var voidLayer = wp.getLayer().withName("Void").go();
	
}

	//heightmap
if ( true ) {

	var heightMap = wp.getHeightMap().fromFile(path+'image_exports/'+tile+'/'+tile+'.png').go();
	var world = wp.createWorld()
		.fromHeightMap(heightMap)
		.shift(shiftLongitute, shiftLatitude)
		.fromLevels(0, 255).toLevels(0, 255)
		.go();
		
	//load the correct GameTypes from the existing *.world files
	if ( settingsMapVersion === "1-12" ) {
		var world2 = wp.getWorld()
			.fromFile(path+'wpscript/1-12.world')
			.go();
		var gameType = world2.getGameType();
		world.setGameType(gameType);
	} else if ( settingsMapVersion === "1-16" ) {
		var world2 = wp.getWorld()
			.fromFile(path+'wpscript/1-16.world')
			.go();
		var gameType = world2.getGameType();
		world.setGameType(gameType);
	} else if ( settingsMapVersion === "1-17" ) {
		var world2 = wp.getWorld()
			.fromFile(path+'wpscript/1-17.world')
			.go();
		var gameType = world2.getGameType();
		world.setGameType(gameType);
	} else if ( ( verticalScale === 25 || verticalScale === 10 || verticalScale === 5 ) && ( settingsMapVersion === "1-18" || settingsMapVersion === "1-19" ) && tilesPerMap === 1) {
		var world2 = wp.getWorld()
			.fromFile(path+'wpscript/1-18-ex.world') //ex has -64/2032 block limit (only usefull for 1 DPT and verticle scale of 1:25, 1:10, 1:5)
			.go();
		var gameType = world2.getGameType();
		world.setGameType(gameType);
	} else if ( settingsMapVersion === "1-18" || settingsMapVersion === "1-19" ) {
		var world2 = wp.getWorld()
			.fromFile(path+'wpscript/1-18.world') //standard -64/320 block limit
			.go();
		var gameType = world2.getGameType();
		world.setGameType(gameType);
	} else {
		var world2 = wp.getWorld()
			.fromFile(path+'wpscript/1-12.world')
			.go();
		var gameType = world2.getGameType();
		world.setGameType(gameType);
	}


	print("heightmap created");
}

	//void
if ( true ) {

	//base biomes
	wp.applyHeightMap(heightMap) 
		.toWorld(world)
		.shift(shiftLongitute, shiftLatitude)
		.applyToLayer(biomesLayer)
		.fromLevels(0, 255).toLevel(127) //Void biome
		.go();
		
	//Void Layer
	wp.applyHeightMap(heightMap) 
		.toWorld(world)
		.shift(shiftLongitute, shiftLatitude)
		.applyToLayer(voidLayer)
		.fromLevels(0, 255).toLevel(1) //Void layer
		.go();

	print("Void created");
	
}

	//export
if ( true ) {

	//and export the world
	wp.exportWorld(world)
		.toDirectory(path+'wpscript/exports')
		.go();

	world = null;
	print("world exported");

}