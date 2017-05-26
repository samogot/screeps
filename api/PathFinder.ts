/**
 * Contains powerful methods for pathfinding in the game world. This module is written in fast native C++ code and supports custom navigation costs and paths which span multiple rooms.
 * @global
 */
const PathFinder: IPathFinder;

/**
 * Contains powerful methods for pathfinding in the game world. This module is written in fast native C++ code and supports custom navigation costs and paths which span multiple rooms.
 */
interface IPathFinder {
    /**
     * Find an optimal path between <code>origin</code> and <code>goal</code>.
     *
     * This method has high CPU cost.
     *
     * @param {RoomPosition} origin The start position.
     * @param {object} goal
     * A goal or an array of goals. If more than one goal is supplied then the cheapest path found out of all the goals will be returned. A goal is either a RoomPosition or an object as defined below.
     *
     * <em><b>Important:</b></em> Please note that if your goal is not walkable (for instance, a source) then you should set <code>range</code> to at least 1 or else you will waste many CPU cycles searching for a target that you can't walk on.
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">pos</div>
     *                            <div class="api-arg-type">{@link RoomPosition}</div>
     *                            <div class="api-arg-desc">The target.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">range</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">Range to <code>pos</code> before goal is considered reached. The default is 0.</div>
     *                        </li>
     *                    </ul>
     * @param {IPathFinderOpts} opts (optional) An object containing additional pathfinding flags.
     * <ul>
     *     <li>
     *         <div class="api-arg-title">roomCallback</div>
     *         <div class="api-arg-type">function</div>
     *         <div class="api-arg-desc">Request from the pathfinder to generate a {@link CostMatrix} for a certain room. The callback accepts one argument, <code>roomName</code>. This callback will only be called once per room per search. If you are running multiple pathfinding operations in a single room and in a single tick you may consider caching your CostMatrix to speed up your code. Please read the CostMatrix documentation below for more information on CostMatrix. If you return <code>false</code> from the callback the requested room will not be searched, and it won't count against <code>maxRooms</code></div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">plainCost</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Cost for walking on plain positions. The default is 1.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">swampCost</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Cost for walking on swamp positions. The default is 5.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">flee</div>
     *         <div class="api-arg-type">boolean</div>
     *         <div class="api-arg-desc">Instead of searching for a path <em>to</em> the goals this will search for a path <em>away</em> from the goals. The cheapest path that is out of <code>range</code> of every goal will be returned. The default is false.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">maxOps</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">The maximum allowed pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">maxRooms</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">The maximum allowed rooms to search. The default (and maximum) is 16.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">maxCost</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">The maximum allowed cost of the path returned. If at any point the pathfinder detects that it is impossible to find a path with a cost less than or equal to <code>maxCost</code> it will immediately halt the search. The default is Infinity.</div>
     *     </li>
     *     <li>
     *         <div class="api-arg-title">heuristicWeight</div>
     *         <div class="api-arg-type">number</div>
     *         <div class="api-arg-desc">Weight to apply to the heuristic in the A\* formula <code>F = G + weight \* H</code>. Use this option only if you understand the underlying A\* algorithm mechanics! The default value is 1.2.</div>
     *     </li>
     * </ul>
     *
     * @return {IPathFinderResult} An object containing the following properties:
     *
     * property | description
     * ---|---
     * <code>path</code> | An array of RoomPosition objects.
     * <code>ops</code> | Total number of operations performed before this path was calculated.
     * <code>cost</code> | The total cost of the path as derived from <code>plainCost</code>, <code>swampCost</code> and any given CostMatrix instances.
     * <code>incomplete</code> | If the pathfinder fails to find a complete path, this will be true. Note that <code>path</code> will still be populated with a partial path which represents the closest path it could find given the search parameters.
     *
     * @example
     *   let creep = Game.creeps.John;
     *
     *   let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
	 *     // We can't actually walk on sources-- set <code>range</code> to 1 
	 *     // so we path next to it.
	 *     return { pos: source.pos, range: 1 };
	 *   });
     *
     *   let ret = PathFinder.search(
     *     creep.pos, goals,
     *     {
	 *       // We need to set the defaults costs higher so that we
	 *       // can set the road cost lower in <code>roomCallback</code>
	 *       plainCost: 2,
	 *       swampCost: 10,
	 * 
	 *       roomCallback: function(roomName) {
	 * 
	 *         let room = Game.rooms[roomName];
	 *         // In this example <code>room</code> will always exist, but since 
	 *         // PathFinder supports searches which span multiple rooms 
	 *         // you should be careful!
	 *         if (!room) return;
	 *         let costs = new PathFinder.CostMatrix;
	 * 
	 *         room.find(FIND_STRUCTURES).forEach(function(struct) {
	 *           if (struct.structureType === STRUCTURE_ROAD) {
	 *             // Favor roads over plain tiles
	 *             costs.set(struct.pos.x, struct.pos.y, 1);
	 *           } else if (struct.structureType !== STRUCTURE_CONTAINER &&
	 *                      (struct.structureType !== STRUCTURE_RAMPART ||
	 *                       !struct.my)) {
	 *             // Can't walk through non-walkable buildings
	 *             costs.set(struct.pos.x, struct.pos.y, 0xff);
	 *           }
	 *         });
	 * 
	 *         // Avoid creeps in the room
	 *         room.find(FIND_CREEPS).forEach(function(creep) {
	 *           costs.set(creep.pos.x, creep.pos.y, 0xff);
	 *         });
	 * 
	 *         return costs;
	 *       },
	 *     }
     *   );
     *
     *   let pos = ret.path[0];
     *   creep.move(creep.pos.getDirectionTo(pos));
     */
    search(origin: RoomPosition, goal: RoomPosition | {
        /**
         * The target.
         */
        pos: RoomPosition,

        /**
         * Range to <code>pos</code> before goal is considered reached. The default is 0.
         */
        range: number,
    }, opts?: IPathFinderOpts): IPathFinderResult,

    /**
     * Specify whether to use this new experimental pathfinder in game objects methods. This method should be invoked every tick. It affects the following methods behavior: {@link Room.findPath}, {@link RoomPosition.findPathTo}, {@link RoomPosition.findClosestByPath}, {@link Creep.moveTo}.
     *
     * This method has insignificant CPU cost.
     *
     * @param {boolean} isEnabled Whether to activate the new pathfinder or deactivate. The default is <code>true</code>.
     *
     * @deprecated
     *
     * @example
     * PathFinder.use(true);
     * Game.creeps.John.moveTo(Game.spawns['Spawn1']);
     */
    use(isEnabled: boolean),

    /**
     * Container for custom navigation cost data. By default <code>PathFinder</code> will only consider
     * terrain data (plain, swamp, wall) — if you need to route around obstacles such as buildings
     * or creeps you must put them into a <code>CostMatrix`. Generally you will create your `CostMatrix</code>
     *  from within <code>roomCallback</code>. If a non-0 value is found in a room's CostMatrix then that value
     *  will be used instead of the default terrain cost. You should avoid using large values in your
     *  CostMatrix and terrain cost flags. For example, running <code>PathFinder.search</code> with
     *  <code>{ plainCost: 1, swampCost: 5 }` is faster than running it with `{plainCost: 2, swampCost: 10 }</code>
     *  even though your paths will be the same.
     */
    CostMatrix: {
        /**
         * Creates a new CostMatrix containing 0's for all positions.
         *
         * @example
         * let costs = new PathFinder.CostMatrix;
         */
        new (): CostMatrix,

        /**
         * Static method which deserializes a new CostMatrix using the return value of <code>serialize</code>.
         *
         * This method has low CPU cost.
         *
         * @param {number[]} val Whatever <code>serialize</code> returned
         *
         * @return {CostMatrix} Returns new <code>CostMatrix</code> instance.
         *
         * @example
         * let costs = PathFinder.CostMatrix.deserialize(Memory.savedMatrix)
         */
        deserialize(val: number[]): CostMatrix,
    }
}

/**
 * Container for custom navigation cost data. By default <code>PathFinder</code> will only consider
 * terrain data (plain, swamp, wall) — if you need to route around obstacles such as buildings
 * or creeps you must put them into a <code>CostMatrix`. Generally you will create your `CostMatrix</code>
 *  from within <code>roomCallback</code>. If a non-0 value is found in a room's CostMatrix then that value
 *  will be used instead of the default terrain cost. You should avoid using large values in your
 *  CostMatrix and terrain cost flags. For example, running <code>PathFinder.search</code> with
 *  <code>{ plainCost: 1, swampCost: 5 }` is faster than running it with `{plainCost: 2, swampCost: 10 }</code>
 *  even though your paths will be the same.
 */
interface CostMatrix {
    /**
     * Creates a new CostMatrix containing 0's for all positions.
     *
     * @example
     * let costs = new PathFinder.CostMatrix;
     */
    constructor (): CostMatrix,

    /**
     * Set the cost of a position in this CostMatrix.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     * @param {number} cost Cost of this position. Must be a whole number. A cost of 0 will use the terrain cost for that tile. A cost greater than or equal to 255 will be treated as unwalkable.
     *
     * @example
     * let costs = new PathFinder.CostMatrix;
     * let pos = Game.spawns['Spawn1'].pos;
     * costs.set(pos.x, pos.y, 255); // Can't walk over a building
     */
    set(x: number, y: number, cost: number): void,

    /**
     * Get the cost of a position in this CostMatrix.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number} x X position in the room.
     * @param {number} y Y position in the room.
     */
    get(x: number, y: number): number,

    /**
     * Copy this CostMatrix into a new CostMatrix with the same data.
     *
     * This method has low CPU cost.
     *
     * @return {CostMatrix} A new CostMatrix instance.
     */
    clone(): CostMatrix,

    /**
     * Returns a compact representation of this CostMatrix which can be stored via <code>JSON.stringify</code>.
     *
     * This method has low CPU cost.
     *
     * @return {number[]} An array of numbers. There's not much you can do with the numbers besides store them for later.
     *
     * @example
     * let costs = new PathFinder.CostMatrix;
     * Memory.savedMatrix = costs.serialize();
     */
    serialize(): number[],
}

interface IPathFinderOpts {
    /**
     * Request from the pathfinder to generate a {@link CostMatrix} for a certain room. The callback accepts one argument, <code>roomName</code>. This callback will only be called once per room per search. If you are running multiple pathfinding operations in a single room and in a single tick you may consider caching your CostMatrix to speed up your code. Please read the CostMatrix documentation below for more information on CostMatrix. If you return <code>false</code> from the callback the requested room will not be searched, and it won't count against <code>maxRooms</code>
     */
    roomCallback?(roomName: string): boolean,

    /**
     * Cost for walking on plain positions. The default is 1.
     * @default 1
     */
    plainCost?: number,

    /**
     * Cost for walking on swamp positions. The default is 5.
     * @default 5
     */
    swampCost?: number,

    /**
     * Instead of searching for a path <i>to</i> the goals this will search for a path <i>away</i> from the goals. The cheapest path that is out of <code>range</code> of every goal will be returned. The default is false.
     * @default false
     */
    flee?: boolean,

    /**
     * The maximum allowed pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000.
     * @default 2000
     */
    maxOps?: number,

    /**
     * The maximum allowed rooms to search. The default (and maximum) is 16.
     * @default 16
     */
    maxRooms?: number,

    /**
     * The maximum allowed cost of the path returned. If at any point the pathfinder detects that it is impossible to find a path with a cost less than or equal to <code>maxCost</code> it will immediately halt the search. The default is Infinity.
     * @default Infinity
     */
    maxCost?: number,

    /**
     * Weight to apply to the heuristic in the A\* formula <code>F = G + weight \* H</code>. Use this option only if you understand the underlying A\* algorithm mechanics! The default value is 1.2.
     * @default 1.2
     */
    heuristicWeight?: number,

}

interface IPathFinderResult {
    /**
     * An array of RoomPosition objects.
     */
    path: RoomPosition[],

    /**
     * Total number of operations performed before this path was calculated.
     */
    ops: number,

    /**
     * The total cost of the path as derived from <code>plainCost</code>, <code>swampCost</code> and any given CostMatrix instances.
     */
    cost: number,

    /**
     * If the pathfinder fails to find a complete path, this will be true. Note that <code>path</code> will still be populated with a partial path which represents the closest path it could find given the search parameters.
     */
    incomplete: boolean,
}