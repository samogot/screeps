/**
 * An object representing the specified position in the room. Every <code>RoomObject</code> in the room
 * contains <code>RoomPosition</code> as the <code>pos</code> property. The position object of a custom location
 * can be obtained using the {@link Room.getPositionAt} method or using the constructor.
 */
class RoomPosition {
    /**
     * You can create new <code>RoomPosition</code> object using its constructor.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     * @param {string} roomName The room name.
     *
     * @example
     * const pos = new RoomPosition(10, 25, 'sim');
     */
    constructor(x: number, y: number, roomName: string) {
    };

    /**
     * The name of the room.
     */
    roomName: string;

    /**
     * X position in the room.
     */
    x: number;

    /**
     * Y position in the room.
     */
    y: number;

    /**
     * Create new {@link ConstructionSite} at the specified location.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} structureType One of the <code>STRUCTURE_*</code> constants.
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
     * Game.flags.Flag1.pos.createConstructionSite(STRUCTURE_ROAD);
     */
    createConstructionSite(structureType: string): number {
        return
    }

    /**
     * Create new {@link Flag} at the specified location.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} name (optional) The name of a new flag. It should be unique, i.e. the <code>Game.flags</code> object should not contain another flag with the same name (hash key). If not defined, a random name will be generated.
     * @param {string} color (optional) The color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is <code>COLOR_WHITE</code>.
     * @param {string} secondaryColor (optional) The secondary color of a new flag. Should be one of the <code>COLOR_*</code> constants. The default value is equal to <code>color</code>.
     *
     * @return {number} The name of a new flag, or one of the following error codes:
     * <br>
     *
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
     * creep.pos.createFlag('Flag1');
     */
    createFlag(name?: string, color?: string, secondaryColor?: string): number {
        return
    }

    /**
     * Find an object with the shortest path from the given position. Uses {@link http://en.wikipedia.org/wiki/Jump_point_search Jump Point Search algorithm} and {@link http://en.wikipedia.org/wiki/Dijkstra Dijkstra's algorithm}.
     *
     * This method has high CPU cost.
     *
     * @param {number} type See {@link Room.find}.
     * @param {object} opts (optional) An object containing pathfinding options (see {@link Room.findPath}), or one of the following:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">filter</div>
     *                            <div class="api-arg-type">object, function, string</div>
     *                            <div class="api-arg-desc">Only the objects which pass the filter using the {@link https://lodash.com/docs#filter Lodash.filter} method will be used.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">algorithm</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">One of the following constants:
     *                                <ul>
     *                                    <li><code>astar</code> is faster when there are relatively few possible targets;</li>
     *                                    <li><code>dijkstra</code> is faster when there are a lot of possible targets or when the closest target is nearby.</li>
     *                                </ul>
     *                                The default value is determined automatically using heuristics.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomObject|null} The closest object if found, null otherwise.
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
     * creep.moveTo(target);
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {maxOps: 500});
     * creep.moveTo(target);
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
	 *     filter: function(object) {
	 *         return object.getActiveBodyparts(ATTACK) == 0;
	 *     }
	 * });
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
	 *     filter: { owner: { username: 'Invader' } }
	 * });
     *
     * @example
     * const targets = [
     *     Game.creeps.John,
     *     Game.creeps.Mike,
     *     room.getPositionAt(10,10)
     * ];
     * const closest = creep.pos.findClosestByPath(targets);
     */
    findClosestByPath(type: number, opts?: IShortestPathOpts): RoomObject | null {
        return
    }

    /**
     * Find an object with the shortest path from the given position. Uses {@link http://en.wikipedia.org/wiki/Jump_point_search Jump Point Search algorithm} and {@link http://en.wikipedia.org/wiki/Dijkstra Dijkstra's algorithm}.
     *
     * This method has high CPU cost.
     *
     * @param {Array<RoomPosition|RoomObject>} objects An array of room's objects or {@link RoomPosition} objects that the search should be executed against.
     * @param {object} opts (optional) An object containing pathfinding options (see {@link Room.findPath}), or one of the following:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">filter</div>
     *                            <div class="api-arg-type">object, function, string</div>
     *                            <div class="api-arg-desc">Only the objects which pass the filter using the {@link https://lodash.com/docs#filter Lodash.filter} method will be used.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">algorithm</div>
     *                            <div class="api-arg-type">string</div>
     *                            <div class="api-arg-desc">One of the following constants:
     *                                <ul>
     *                                    <li><code>astar</code> is faster when there are relatively few possible targets;</li>
     *                                    <li><code>dijkstra</code> is faster when there are a lot of possible targets or when the closest target is nearby.</li>
     *                                </ul>
     *                                The default value is determined automatically using heuristics.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomObject|null} The closest object if found, null otherwise.
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
     * creep.moveTo(target);
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {maxOps: 500});
     * creep.moveTo(target);
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
	 *     filter: function(object) {
	 *         return object.getActiveBodyparts(ATTACK) == 0;
	 *     }
	 * });
     *
     * @example
     * const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
	 *     filter: { owner: { username: 'Invader' } }
	 * });
     *
     * @example
     * const targets = [
     *     Game.creeps.John,
     *     Game.creeps.Mike,
     *     room.getPositionAt(10,10)
     * ];
     * const closest = creep.pos.findClosestByPath(targets);
     */
    findClosestByPath(objects: Array<RoomPosition | RoomObject>, opts?: IShortestPathOpts): RoomObject | null {
        return
    }

    /**
     * Find an object with the shortest linear distance from the given position.
     *
     * This method has medium CPU cost.
     *
     * @param {number} type See {@link Room.find}.
     * @param {IFilterOpts} opts (optional) An object containing one of the following options:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">filter</div>
     *                            <div class="api-arg-type">object, function, string</div>
     *                            <div class="api-arg-desc">Only the objects which pass the filter using the {@link https://lodash.com/docs#filter Lodash.filter} method will be used.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomObject|null} The closest object if found, null otherwise.
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
     * creep.moveTo(target);
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
	 *     filter: function(object) {
	 *         return object.getActiveBodyparts(ATTACK) == 0;
	 *     }
	 * });
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
	 *     filter: { owner: { username: 'Invader' } }
	 * });
     *
     * @example
     * const targets = [
     *     Game.creeps.John,
     *     Game.creeps.Mike,
     *     room.getPositionAt(10,10)
     * ];
     * const closest = creep.pos.findClosestByRange(targets);
     */
    findClosestByRange(type: number, opts?: IFilterOpts): RoomObject | null {
        return
    }

    /**
     * Find an object with the shortest linear distance from the given position.
     *
     * This method has medium CPU cost.
     *
     * @param {Array<RoomPosition | RoomObject>} objects An array of room's objects or {@link RoomPosition} objects that the search should be executed against.
     * @param {IFilterOpts} opts (optional) An object containing one of the following options:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">filter</div>
     *                            <div class="api-arg-type">object, function, string</div>
     *                            <div class="api-arg-desc">Only the objects which pass the filter using the {@link https://lodash.com/docs#filter Lodash.filter} method will be used.</div>
     *                        </li>
     *                    </ul>
     *
     * @return {RoomObject|null} The closest object if found, null otherwise.
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
     * creep.moveTo(target);
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
	 *     filter: function(object) {
	 *         return object.getActiveBodyparts(ATTACK) == 0;
	 *     }
	 * });
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
	 *     filter: { owner: { username: 'Invader' } }
	 * });
     *
     * @example
     * const targets = [
     *     Game.creeps.John,
     *     Game.creeps.Mike,
     *     room.getPositionAt(10,10)
     * ];
     * const closest = creep.pos.findClosestByRange(targets);
     */
    findClosestByRange(objects: Array<RoomPosition | RoomObject>, opts?: IFilterOpts): RoomObject | null {
        return
    }

    /**
     * Find all objects in the specified linear range.
     *
     * This method has medium CPU cost.
     *
     * @param {number} type See {@link Room.find}.
     * @param {number} range The range distance.
     * @param {IFilterOpts} opts (optional) See {@link Room.find}.
     *
     * @return {RoomObject[]} An array with the objects found.
     *
     * @example
     * const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
     * if(targets.length > 0) {
	 *     creep.rangedAttack(targets[0]);
	 * }
     *
     * @example
     * const targets = [
     *     Game.creeps.John,
     *     Game.creeps.Mike,
     *     room.getPositionAt(10,10)
     * ];
     * const inRangeTargets = creep.pos.findInRange(targets, 3);
     */
    findInRange(type: number, range: number, opts?: IFilterOpts): RoomObject[] {
        return
    }

    /**
     * Find all objects in the specified linear range.
     *
     * This method has medium CPU cost.
     *
     * @param {Array<RoomPosition | RoomObject>} objects An array of room's objects or {@link RoomPosition} objects that the search should be executed against.
     * @param {number} range The range distance.
     * @param {IFilterOpts} opts (optional) See {@link Room.find}.
     *
     * @return {RoomObject[]} An array with the objects found.
     *
     * @example
     * const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
     * if(targets.length > 0) {
	 *     creep.rangedAttack(targets[0]);
	 * }
     *
     * @example
     * const targets = [
     *     Game.creeps.John,
     *     Game.creeps.Mike,
     *     room.getPositionAt(10,10)
     * ];
     * const inRangeTargets = creep.pos.findInRange(targets, 3);
     */
    findInRange(objects: Array<RoomPosition | RoomObject>, range: number, opts?: IFilterOpts): RoomObject[] {
        return
    }

    /**
     * Find an optimal path to the specified position using {@link http://en.wikipedia.org/wiki/Jump_point_search Jump Point Search algorithm}. This method is a shorthand for {@link Room.findPath}. If the target is in another room, then the corresponding exit will be used as a target.
     *
     * This method has high CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     * @param {IPathOpts} opts (optional) An object containing pathfinding options flags (see {@link Room.findPath} for more details).
     *
     * @return {IPathItem[]} An array with path steps in the following format:
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
     * const path = creep.pos.findPathTo(target);
     * creep.move(path[0].direction);
     *
     * @example
     * let path = creep.pos.findPathTo(target, {maxOps: 200});
     * if( !path.length || !target.equalsTo(path[path.length - 1]) ) {
	 *     path = creep.pos.findPathTo(target, 
	 *         {maxOps: 1000, ignoreDestructibleStructures: true});
	 * }
     * if( path.length ) {
	 *     creep.move(path[0].direction);
	 * }
     */
    findPathTo(x: number, y: number, opts?: IPathOpts): IPathItem[] {
        return
    }

    /**
     * Find an optimal path to the specified position using {@link http://en.wikipedia.org/wiki/Jump_point_search Jump Point Search algorithm}. This method is a shorthand for {@link Room.findPath}. If the target is in another room, then the corresponding exit will be used as a target.
     *
     * This method has high CPU cost.
     *
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     * @param {IPathOpts} opts (optional) An object containing pathfinding options flags (see {@link Room.findPath} for more details).
     *
     * @return {IPathItem[]} An array with path steps in the following format:
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
     * const path = creep.pos.findPathTo(target);
     * creep.move(path[0].direction);
     *
     * @example
     * let path = creep.pos.findPathTo(target, {maxOps: 200});
     * if( !path.length || !target.equalsTo(path[path.length - 1]) ) {
	 *     path = creep.pos.findPathTo(target,
	 *         {maxOps: 1000, ignoreDestructibleStructures: true});
	 * }
     * if( path.length ) {
	 *     creep.move(path[0].direction);
	 * }
     */
    findPathTo(target: object, opts?: IPathOpts): IPathItem[] {
        return
    }

    /**
     * Get linear direction to the specified position.
     *
     * This method has low CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     *
     * @return {number} A number representing one of the direction constants.
     *
     * @example
     * const direction = creep.pos.getDirectionTo(target);
     * creep.move(direction);
     */
    getDirectionTo(x: number, y: number): number {
        return
    }

    /**
     * Get linear direction to the specified position.
     *
     * This method has low CPU cost.
     *
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {number} A number representing one of the direction constants.
     *
     * @example
     * const direction = creep.pos.getDirectionTo(target);
     * creep.move(direction);
     */
    getDirectionTo(target: RoomPosition | RoomObject): number {
        return
    }

    /**
     * Get linear range to the specified position.
     *
     * This method has low CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     *
     * @return {number} A number of squares to the given position.
     *
     * @example
     * const range = creep.pos.getRangeTo(target);
     * if(range <= 3) {
	 *     creep.rangedAttack(target);
	 * }
     */
    getRangeTo(x: number, y: number): number {
        return
    }

    /**
     * Get linear range to the specified position.
     *
     * This method has low CPU cost.
     *
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {number} A number of squares to the given position.
     *
     * @example
     * const range = creep.pos.getRangeTo(target);
     * if(range <= 3) {
	 *     creep.rangedAttack(target);
	 * }
     */
    getRangeTo(target: RoomPosition | RoomObject): number {
        return
    }

    /**
     * Check whether this position is in the given range of another position.
     *
     * This method has low CPU cost.
     *
     * @param {number} x X position in the same room.
     * @param {number} y Y position in the same room.
     * @param {number} range The range distance.
     *
     * @return {boolean} A boolean value.
     *
     * @example
     * if(creep.pos.inRangeTo(target, 3)) {
	 *     creep.rangedAttack(target);
	 * }
     */
    inRangeTo(x: number, y: number, range: number): boolean {
        return
    }

    /**
     * Check whether this position is in the given range of another position.
     *
     * This method has low CPU cost.
     *
     * @param {RoomPosition | RoomObject} target The target position.
     * @param {number} range The range distance.
     *
     * @return {boolean} A boolean value.
     *
     * @example
     * if(creep.pos.inRangeTo(target, 3)) {
	 *     creep.rangedAttack(target);
	 * }
     */
    inRangeTo(target: RoomPosition | RoomObject, range: number): boolean {
        return
    }

    /**
     * Check whether this position is the same as the specified position.
     *
     * This method has low CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     *
     * @return {boolean} A boolean value.
     *
     * @example
     * if(creep.pos.isEqualTo(10,25)) {
	 *     creep.move(RIGHT);
	 * }
     *
     * @example
     * if(creep.pos.isEqualTo(Game.flags.Flag1)) {
	 *     creep.move(RIGHT);
	 * }
     */
    isEqualTo(x: number, y: number): boolean {
        return
    }

    /**
     * Check whether this position is the same as the specified position.
     *
     * This method has low CPU cost.
     *
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {boolean} A boolean value.
     *
     * @example
     * if(creep.pos.isEqualTo(10,25)) {
	 *     creep.move(RIGHT);
	 * }
     *
     * @example
     * if(creep.pos.isEqualTo(Game.flags.Flag1)) {
	 *     creep.move(RIGHT);
	 * }
     */
    isEqualTo(target: RoomPosition | RoomObject): boolean {
        return
    }

    /**
     * Check whether this position is on the adjacent square to the specified position. The same as <code>inRangeTo(target, 1)</code>.
     *
     * This method has low CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     *
     * @return {boolean} A boolean value.
     *
     * @example
     * if(creep.pos.isNearTo(target)) {
	 *     creep.transferEnergy(target);
	 * }
     */
    isNearTo(x: number, y: number): boolean {
        return
    }

    /**
     * Check whether this position is on the adjacent square to the specified position. The same as <code>inRangeTo(target, 1)</code>.
     *
     * This method has low CPU cost.
     *
     * @param {RoomPosition | RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}.
     *
     * @return {boolean} A boolean value.
     *
     * @example
     * if(creep.pos.isNearTo(target)) {
	 *     creep.transferEnergy(target);
	 * }
     */
    isNearTo(target: RoomPosition | RoomObject): boolean {
        return
    }

    /**
     * Get the list of objects at the specified room position.
     *
     * This method has medium CPU cost.
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
     * const look = Game.flags.Flag1.pos.look();
     * look.forEach(function(lookObject) {
	 *     if(lookObject.type == LOOK_CREEPS && 
	 *        lookObject[LOOK_CREEPS].getActiveBodyparts(ATTACK) == 0) {
	 *         creep.moveTo(lookObject.creep);
	 *     }
	 * });
     */
    look(): ILook[] {
        return
    }

    /**
     * Get an object with the given type at the specified room position.
     *
     * This method has low CPU cost.
     *
     * @param {string} type One of the <code>LOOK_*</code> constants.
     *
     * @return {} An array of objects of the given type at the specified position if found.
     *
     * @example
     * const found = Game.flags.Flag1.pos.lookFor(LOOK_CREEPS);
     * if(found.length && found[0].getActiveBodyparts(ATTACK) == 0) {
	 *     creep.moveTo(found[0]);
	 * }
     */
    lookFor(type: string): ILookObj[] {
        return
    }
}