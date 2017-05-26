/**
 * An object representing the room in which your units and structures are in.
 * It can be used to look around, find paths, etc. Every <code>RoomObject</code> in the room contains
 * its linked <code>Room</code> instance in the <code>room</code> property.
 */
interface Room {
    /**
     * The Controller structure of this room, if present, otherwise undefined.
     */
    controller?: StructureController,

    /**
     * Total amount of energy available in all spawns and extensions in the room.
     */
    energyAvailable: number,

    /**
     * Total amount of <code>energyCapacity</code> of all spawns and extensions in the room.
     */
    energyCapacityAvailable: number,

    /**
     * A shorthand to <code>Memory.rooms[room.name]</code>. You can use it for quick access the room’s specific memory data object. {@link http://docs.screeps.com/global-objects.html#Memory-object Learn more about memory}
     *
     * @example
     * room.memory.stage = 2;
     */
    memory: any,

    /**
     * One of the <code>MODE_*</code> constants:
     */
    mode: string,

    /**
     * The name of the room.
     */
    name: string,

    /**
     * The Storage structure of this room, if present, otherwise undefined.
     */
    storage?: StructureStorage,

    /**
     * The Terminal structure of this room, if present, otherwise undefined.
     */
    terminal?: StructureTerminal,

    /**
     * A {@link RoomVisual} object for this room. You can use this object to draw simple shapes (lines, circles, text labels) in the room.
     */
    visual: RoomVisual,

    /**
     * Serialize a path array into a short string representation, which is suitable to store in memory.
     *
     * This method has low CPU cost.
     *
     * @param {IPathItem[]} path A path array retrieved from <code>{@link Room.findPath}</code>.
     *
     * @return {} A serialized string form of the given path.
     *
     * @example
     * const path = spawn.pos.findPathTo(source);
     * Memory.path = Room.serializePath(path);
     * creep.moveByPath(Memory.path);
     */
    serializePath(path: IPathItem[]): string,

    /**
     * Deserialize a short string path representation into an array form.
     *
     * This method has low CPU cost.
     *
     * @param {string} path A serialized path string.
     *
     * @return {IPathItem[]} A path array.
     *
     * @example
     * const path = Room.deserializePath(Memory.path);
     * creep.moveByPath(path);
     */
    deserializePath(path: string): IPathItem[]

    /**
     * Create new {@link ConstructionSite} at the specified location.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {number} x The X position.
     * @param {number} y The Y position.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The structure cannot be placed at the specified location.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>You have too many construction sites. The maximum number of construction sites per player is 100.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The location is incorrect.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient. {@link http://support.screeps.com/hc/en-us/articles/203086021-Territory-control Learn more}</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_ROAD);
     */
    createConstructionSite(x: number, y: number, structureType: string): number,

    /**
     * Create new {@link ConstructionSite} at the specified location.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {RoomPosition | RoomObject} pos Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     * @param {string} structureType One of the <code>STRUCTURE_*</code> constants.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The structure cannot be placed at the specified location.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>You have too many construction sites. The maximum number of construction sites per player is 100.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The location is incorrect.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient. {@link http://support.screeps.com/hc/en-us/articles/203086021-Territory-control Learn more}</td>
     *   </tr>
     * </table>
     */
    createConstructionSite(pos: RoomPosition | RoomObject, structureType: string): number,

    /**
     * Create new {@link Flag} at the specified location.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {number} x The X position.
     * @param {number} y The Y position.
     * @param {string} name (optional) The name of a new flag. It should be unique, i.e. the <code>Game.flags</code> object should not contain another flag with the same name (hash key). If not defined, a random name will be generated. The maximum length is 60 characters.
     * @param {string} color (optional) The color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is <code>COLOR_WHITE</code>.
     * @param {string} secondaryColor (optional) The secondary color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is equal to <code>color</code>.
     *
     * @return {number} The name of a new flag, or one of the following error codes:
     * <table>
     *   <tr>
     *     <td>{@link ERR_NAME_EXISTS}</td>
     *     <td>There is a flag with the same name already.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The location or the color constant is incorrect.</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.rooms.sim.createFlag(5, 12, 'Flag1');
     */
    createFlag(x: number, y: number, name?: string, color?: string, secondaryColor?: string): number,

    /**
     * Create new {@link Flag} at the specified location.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {RoomPosition | RoomObject} pos Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     * @param {string} name (optional) The name of a new flag. It should be unique, i.e. the <code>Game.flags</code> object should not contain another flag with the same name (hash key). If not defined, a random name will be generated. The maximum length is 60 characters.
     * @param {string} color (optional) The color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is <code>COLOR_WHITE</code>.
     * @param {string} secondaryColor (optional) The secondary color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is equal to <code>color</code>.
     *
     * @return {number} The name of a new flag, or one of the following error codes:
     * <table>
     *   <tr>
     *     <td>{@link ERR_NAME_EXISTS}</td>
     *     <td>There is a flag with the same name already.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The location or the color constant is incorrect.</td>
     *   </tr>
     * </table>
     */
    createFlag(pos: RoomPosition | RoomObject, name?: string, color?: string, secondaryColor?: string): number,

    /**
     * Find all objects of the specified type in the room.
     *
     * This method has medium CPU cost.
     *
     * @param {number} type One of the <code>FIND_*</code> constants.
     * @param {object} opts (optional) An object with additional options:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">filter</div>
     *                            <div class="api-arg-type">object, function, string</div>
     *                            <div class="api-arg-desc">The result list will be filtered using the {@link https://lodash.com/docs#filter Lodash.filter} method.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {Array<RoomObject | RoomPosition>} An array with the objects found.
     *
     * @example
     * const targets = creep.room.find(FIND_DROPPED_RESOURCES);
     * if(targets.length) {
	 *     creep.moveTo(targets[0]);
	 *     creep.pickup(targets[0]);
	 * }
     *
     * @example
     * const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
	 *     filter: { structureType: STRUCTURE_EXTENSION }
	 * });
     * console.log('Spawn has '+extensions.length+' extensions available');
     *
     * @example
     * const targets = creep.room.find(FIND_HOSTILE_CREEPS, {
	 *     filter: function(object) {
	 *         return object.getActiveBodyparts(ATTACK) == 0;
	 *     }
	 * });
     */
    find(type: number, opts?: IFilterOpts): Array<RoomObject | RoomPosition>,

    /**
     * Find the exit direction en route to another room. Please note that this method is not required for inter-room movement, you can simply pass the target in another room into {@link Creep.moveTo} method.
     *
     * This method has high CPU cost.
     *
     * @param {string | Room} room Another room name or room object.
     *
     * @return {number} The room direction constant, one of the following:
     *
     * * <code>FIND_EXIT_TOP</code>
     * * <code>FIND_EXIT_RIGHT</code>
     * * <code>FIND_EXIT_BOTTOM</code>
     * * <code>FIND_EXIT_LEFT</code>
     *
     * Or one of the following error codes:
     * <table>
     *   <tr>
     *     <td>{@link ERR_NO_PATH}</td>
     *     <td>Path can not be found.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The location is incorrect.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const exitDir = creep.room.findExitTo(anotherCreep.room);
     * const exit = creep.pos.findClosestByRange(exitDir);
     * creep.moveTo(exit);
     *
     * // or simply:
     * creep.moveTo(anotherCreep);
     * creep.moveTo(new RoomPosition(25,25, anotherCreep.pos.roomName));
     */
    findExitTo(room: string | Room): number,

    /**
     * Find an optimal path inside the room between fromPos and toPos using {@link http://en.wikipedia.org/wiki/Jump_point_search Jump Point Search algorithm}.
     *
     * This method has high CPU cost.
     *
     * @param {RoomPosition} fromPos The start position.
     * @param {RoomPosition} toPos The end position.
     * @param {IPathOpts} opts (optional) An object containing additonal pathfinding flags:
     * <ul>
     *     <li>
     *         <div class="api-arg-title">ignoreCreeps</div>
     *         <div class="api-arg-type">boolean</div>
     *         <div class="api-arg-desc">Treat squares with creeps as walkable. Can be useful with too many moving creeps around or in some other cases. The default value is false.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">ignoreDestructibleStructures</div>
     *         <div class="api-arg-type">boolean</div>
     *         <div class="api-arg-desc">Treat squares with destructible structures (constructed walls, ramparts, spawns, extensions) as walkable. Use this flag when you need to move through a territory blocked by hostile structures. If a creep with an <code>ATTACK</code> body part steps on such a square, it automatically attacks the structure. The default value is false.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">ignoreRoads</div>
     *         <div class="api-arg-type">boolean</div>
     *         <div class="api-arg-desc">Ignore road structures. Enabling this option can speed up the search. The default value is false. This is only used when the new {@link PathFinder} is enabled.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">costCallback</div>
     *         <div class="api-arg-type">function(string, CostMatrix)</div>
     *         <div class="api-arg-desc">You can use this callback to modify a {@link http://support.screeps.com/hc/en-us/articles/207666355 CostMatrix} for any room during the search. The callback accepts two arguments, <code>roomName</code> and <code>costMatrix</code>. Use the <code>costMatrix</code> instance to make changes to the positions costs. If you return a new matrix from this callback, it will be used instead of the built-in cached one. This option is only used when the new {@link PathFinder} is enabled.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">ignore</div>
     *         <div class="api-arg-type">array</div>
     *         <div class="api-arg-desc">An array of the room's objects or {@link RoomPosition} objects which should be treated as walkable tiles during the search. This option cannot be used when the new {@link PathFinder} is enabled (use <code>costCallback</code> option instead).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">avoid</div>
     *         <div class="api-arg-type">array</div>
     *         <div class="api-arg-desc">An array of the room's objects or {@link RoomPosition} objects which should be treated as obstacles during the search. This option cannot be used when the new {@link PathFinder} is enabled (use <code>costCallback</code> option instead).</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">maxOps</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">The maximum limit of possible pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">heuristicWeight</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Weight to apply to the heuristic in the A* formula <code>F = G + weight * H</code>. Use this option only if you understand the underlying A* algorithm mechanics! The default value is 1.2.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">serialize</div>
     *         <div class="api-arg-type">boolean</div>
     *         <div class="api-arg-desc">If true, the result path will be serialized using <code>{@link Room.serializePath}</code>. The default is false.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">maxRooms</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">The maximum allowed rooms to search. The default (and maximum) is 16. This is only used when the new {@link PathFinder} is enabled.</div>
     *     </li>
     * </ul>
     *
     * @return {} An array with path steps in the following format:
     *
     * <code>
     * [
     *     { x: 10, y: 5, dx: 1,  dy: 0, direction: RIGHT },
     *     { x: 10, y: 6, dx: 0,  dy: 1, direction: BOTTOM },
     *     { x: 9,  y: 7, dx: -1, dy: 1, direction: BOTTOM_LEFT },
     *     ...
     * ]
     * </code>
     *
     * @example
     * const path = creep.room.findPath(creep.pos, targetPos);
     * creep.move(path[0].direction);
     *
     * @example
     * PathFinder.use(true);
     * const path = creep.room.findPath(creep.pos, targetPos, {
	 *     costCallback: function(roomName, costMatrix) {
	 * 	    if(roomName == 'W1N5') {
	 * 		    // set anotherCreep's location as walkable
	 * 			costMatrix.set(anotherCreep.pos.x, anotherCreep.pos.y, 0);
	 * 			// set flag location as an obstacle
	 * 			costMatrix.set(flag.pos.x, flag.pos.y, 255);
	 * 			// increase cost for (25,20) location to 50
	 * 			costMatrix.set(25, 20, 50);
	 * 		}
	 * 	}
	 * });
     *
     * @example
     * let path = creep.room.findPath(creep.pos, targetPos, {maxOps: 200});
     * if( !path.length || !targetPos.isEqualTo(path[path.length - 1]) ) {
	 *     path = creep.room.findPath(creep.pos, targetPos, {
	 * 		maxOps: 1000, ignoreDestructibleStructures: true
	 * 	});
	 * }
     * if( path.length ) {
	 *     creep.move(path[0].direction);
	 * }
     */
    findPath(fromPos: RoomPosition, toPos: RoomPosition, opts?: IPathOpts): IPathItem[],

    /**
     * Creates a {@link RoomPosition} object at the specified location.
     *
     * This method has low CPU cost.
     *
     * @param {number} x The X position.
     * @param {number} y The Y position.
     *
     * @return {RoomPosition} A {@link RoomPosition} object or null if it cannot be obtained.
     *
     * @example
     * const pos = Game.rooms.sim.getPositionAt(5,12);
     * const source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
     */
    getPositionAt(x: number, y: number): RoomPosition,

    /**
     * Get the list of objects at the specified room position.
     *
     * This method has medium CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     *
     * @return {ILook[]} An array with objects at the specified position in the following format:
     *
     * <code>
     * [
     *     { type: 'creep', creep: {...} },
     *     { type: 'structure', structure: {...} },
     *     ...
     *     { type: 'terrain', terrain: 'swamp' }
     * ]
     * </code>
     *
     * @example
     * const look = creep.room.lookAt(target);
     * look.forEach(function(lookObject) {
	 *     if(lookObject.type == LOOK_CREEPS && 
	 *        lookObject[LOOK_CREEPS].getActiveBodyparts(ATTACK) == 0) {
	 *         creep.moveTo(lookObject.creep);
	 *     }
	 * });
     */
    lookAt(x: number, y: number): ILook[],

    /**
     * Get the list of objects at the specified room position.
     *
     * This method has medium CPU cost.
     *
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {ILook[]} An array with objects at the specified position in the following format:
     *
     * <code>
     * [
     *     { type: 'creep', creep: {...} },
     *     { type: 'structure', structure: {...} },
     *     ...
     *     { type: 'terrain', terrain: 'swamp' }
     * ]
     * </code>
     *
     * @example
     * const look = creep.room.lookAt(target);
     * look.forEach(function(lookObject) {
	 *     if(lookObject.type == LOOK_CREEPS &&
	 *        lookObject[LOOK_CREEPS].getActiveBodyparts(ATTACK) == 0) {
	 *         creep.moveTo(lookObject.creep);
	 *     }
	 * });
     */
    lookAt(target: RoomPosition | RoomObject): ILook[],

    /**
     * Get the list of objects at the specified room area.
     *
     * This method has medium CPU cost.
     *
     * @param {number} top The top Y boundary of the area.
     * @param {number} left The left X boundary of the area.
     * @param {number} bottom The bottom Y boundary of the area.
     * @param {number} right The right X boundary of the area.
     * @param {boolean} asArray (optional) Set to true if you want to get the result as a plain array.
     *
     * @return {} If <code>asArray</code> is set to false or undefined, the method returns
     * an object with all the objects in the specified area in the following format:
     *
     * <code>
     * // 10,5,11,7
     *
     * {
	 *     10: {
	 *         5: [{ type: 'creep', creep: {...} },
	 *             { type: 'terrain', terrain: 'swamp' }],
	 *         6: [{ type: 'terrain', terrain: 'swamp' }],
	 *         7: [{ type: 'terrain', terrain: 'swamp' }]
	 *     },
	 *     11: {
	 *         5: [{ type: 'terrain', terrain: 'plain' }],
	 *         6: [{ type: 'structure', structure: {...} },
	 *             { type: 'terrain', terrain: 'swamp' }],
	 *         7: [{ type: 'terrain', terrain: 'wall' }]
	 *     }
	 * }
     * </code>If <code>asArray</code> is set to true, the method returns an array in the following format:
     *
     * <code>
     * [
     *     {x: 5, y: 10, type: 'creep', creep: {...}},
     *     {x: 5, y: 10, type: 'terrain', terrain: 'swamp'},
     *     {x: 6, y: 10, type: 'terrain', terrain: 'swamp'},
     *     {x: 7, y: 10, type: 'terrain', terrain: 'swamp'},
     *     {x: 5, y: 11, type: 'terrain', terrain: 'plain'},
     *     {x: 6, y: 11, type: 'structure', structure: {...}},
     *     {x: 6, y: 11, type: 'terrain', terrain: 'swamp'},
     *     {x: 7, y: 11, type: 'terrain', terrain: 'wall'}
     * ]
     * </code>
     *
     * @example
     * const look = creep.room.lookAtArea(10,5,11,7);
     */
    lookAtArea(top: number, left: number, bottom: number, right: number, asArray = false): {
        [Y: number]: {
            [X: number]: ILook[]
        }
    } | ILookWithPos[],

    /**
     * Get an object with the given type at the specified room position.
     *
     * This method has low CPU cost.
     *
     * @param {string} type One of the <code>LOOK_*</code> constants.
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {ILook[]} An array of objects of the given type at the specified position if found.
     *
     * @example
     * const found = creep.room.lookForAt(LOOK_CREEPS, target);
     * if(found.length && found[0].getActiveBodyparts(ATTACK) == 0) {
	 *     creep.moveTo(found[0]);
	 * }
     */
    lookForAt(type: string, target: RoomPosition | RoomObject): ILook[],

    /**
     * Get an object with the given type at the specified room position.
     *
     * This method has low CPU cost.
     *
     * @param {string} type One of the <code>LOOK_*</code> constants.
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     *
     * @return {ILook[]} An array of objects of the given type at the specified position if found.
     *
     * @example
     * const found = creep.room.lookForAt(LOOK_CREEPS, target);
     * if(found.length && found[0].getActiveBodyparts(ATTACK) == 0) {
	 *     creep.moveTo(found[0]);
	 * }
     */
    lookForAt(type: string, x: number, y: number): ILook[],

    /**
     * Get the list of objects with the given type at the specified room area.
     *
     * This method has low CPU cost.
     *
     * @param {string} type One of the <code>LOOK_*</code> constants.
     * @param {number} top The top Y boundary of the area.
     * @param {number} left The left X boundary of the area.
     * @param {number} bottom The bottom Y boundary of the area.
     * @param {number} right The right X boundary of the area.
     * @param {boolean} asArray (optional) Set to true if you want to get the result as a plain array.
     *
     * @return {} If <code>asArray</code> is set to false or undefined, the method returns an object
     * with all the objects of the given type in the specified area in the following format:
     *
     * <code>
     * // 10,5,11,7
     *
     * {
	 *     10: {
	 *         5: [{...}],
	 *         6: undefined,
	 *         7: undefined
	 *     },
	 *     11: {
	 *         5: undefined,
	 *         6: [{...}, {...}],
	 *         7: undefined
	 *     }
	 * }
     * </code>If <code>asArray</code> is set to true, the method returns an array in the following format:
     *
     * <code>
     * [
     *    {x: 5, y: 10, structure: {...}},
     *    {x: 6, y: 11, structure: {...}},
     *    {x: 6, y: 11, structure: {...}}
     * ]
     * </code>
     *
     * @example
     * const look = creep.room.lookForAtArea(LOOK_STRUCTURES,10,5,11,7);
     */
    lookForAtArea(type: string, top: number, left: number, bottom: number, right: number, asArray = false): {
        [Y: number]: {
            [X: number]: ILookObj[]
        }
    } | ILookWithPos[],
}

interface IPathItem {
    x: number,
    y: number,
    dx: number,
    dy: number,
    direction: number
}

interface IFilterOpts {
    /**
     * The result list will be filtered using the {@link https://lodash.com/docs#filter Lodash.filter} method.
     * @param item
     */
    filter?(item: any): boolean
}

interface IShortestPathOpts extends IFilterOpts {
    /**
     * One of the following constants:
     * <ul>
     *     <li><code>astar</code> is faster when there are relatively few possible targets;</li>
     *     <li><code>dijkstra</code> is faster when there are a lot of possible targets or when the closest target is nearby.</li>
     * </ul>
     * The default value is determined automatically using heuristics.
     */
    algorithm?: string,
}

interface IPathOpts {

    /**
     * Treat squares with creeps as walkable. Can be useful with too many moving creeps around or in some other cases. The default value is false.
     */
    ignoreCreeps?: boolean,

    /**
     * Treat squares with destructible structures (constructed walls, ramparts, spawns, extensions) as walkable. Use this flag when you need to move through a territory blocked by hostile structures. If a creep with an <code>ATTACK</code> body part steps on such a square, it automatically attacks the structure. The default value is false.
     */
    ignoreDestructibleStructures?: boolean,

    /**
     * Ignore road structures. Enabling this option can speed up the search. The default value is false. This is only used when the new {@link PathFinder} is enabled.
     */
    ignoreRoads?: boolean,

    /**
     * You can use this callback to modify a {@link http://support.screeps.com/hc/en-us/articles/207666355 CostMatrix} for any room during the search. The callback accepts two arguments, <code>roomName</code> and <code>costMatrix</code>. Use the <code>costMatrix</code> instance to make changes to the positions costs. If you return a new matrix from this callback, it will be used instead of the built-in cached one. This option is only used when the new {@link PathFinder} is enabled.
     */
    costCallback?(roomName: string, costMatrix: CostMatrix): void | CostMatrix,

    /**
     * An array of the room's objects or {@link RoomPosition} objects which should be treated as walkable tiles during the search. This option cannot be used when the new {@link PathFinder} is enabled (use <code>costCallback</code> option instead).
     */
    ignore?: Array<RoomObject | RoomPosition>,

    /**
     * An array of the room's objects or {@link RoomPosition} objects which should be treated as obstacles during the search. This option cannot be used when the new {@link PathFinder} is enabled (use <code>costCallback</code> option instead).
     */
    avoid?: Array<RoomObject | RoomPosition>,

    /**
     * The maximum limit of possible pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000.
     */
    maxOps?: number,

    /**
     * Weight to apply to the heuristic in the A* formula <code>F = G + weight * H</code>. Use this option only if you understand the underlying A* algorithm mechanics! The default value is 1.2.
     */
    heuristicWeight?: number,

    /**
     * If true, the result path will be serialized using <code>{@link Room.serializePath}</code>. The default is false.
     */
    serialize?: boolean,

    /**
     * The maximum allowed rooms to search. The default (and maximum) is 16. This is only used when the new {@link PathFinder} is enabled.
     */
    maxRooms?: number,

}

interface ILook {
    type: string
    creep?: Creep
    energy?: Resource
    resource?: Resource
    source?: Source
    mineral?: Mineral
    structure?: Structure
    flag?: Flag
    constructionSite?: ConstructionSite
    nuke?: Nuke
    terrain?: string
}

interface ILookWithPos extends ILook {
    x: number
    y: number
}

type ILookObj = Creep|Resource|Source|Mineral|Structure|Flag|ConstructionSite|Nuke|string;
