/**
 * The main global game object containing all the game play information.
 */
const Game: IGame;

/**
 * The main global game object containing all the game play information.
 */
interface IGame {
    /**
     * A hash containing all your construction sites with their id as hash keys.
     */
    constructionSites: { [id: string]: ConstructionSite },

    /**
     * An object containing information about your CPU usage with the following properties:
     */
    cpu: {

        /**
         * Your CPU limit depending on your {@link http://support.screeps.com/hc/en-us/articles/203086021-Territory-control Global Control Level}.
         */
        limit: number,

        /**
         * An amount of available CPU time at the current game tick.<br>It can be higher than <code>Game.cpu.limit</code>. {@link http://support.screeps.com/hc/en-us/articles/204332302 Learn more}
         */
        tickLimit: number,

        /**
         * An amount of unused CPU accumulated in your {@link http://support.screeps.com/hc/en-us/articles/204332302 bucket}.
         */
        bucket: number,

        /**
         * Get amount of CPU time used from the beginning of the current game tick. Always returns 0 in the Simulation mode.
         *
         * This method has low CPU cost.
         *
         * @return {number} Returns currently used CPU time as a float number.
         *
         * @example
         * if(Game.cpu.getUsed() > Game.cpu.tickLimit / 2) {
    	 *     console.log("Used half of CPU already!");
    	 * }
         *
         * @example
         * for(const name in Game.creeps) {
         *     const startCpu = Game.cpu.getUsed();
         *
         *     // creep logic goes here
         *
         *     const elapsed = Game.cpu.getUsed() - startCpu;
         *     console.log('Creep '+name+' has used '+elapsed+' CPU time');
         * }
         */
        getUsed(): number,
    },

    /**
     * A hash containing all your creeps with creep names as hash keys.
     *
     * @example
     * for(const i in Game.creeps) {
	 *     Game.creeps[i].moveTo(flag);
	 * }
     */
    creeps: { [name: string]: Creep },

    /**
     * A hash containing all your flags with flag names as hash keys.
     *
     * @example
     * creep.moveTo(Game.flags.Flag1);
     */
    flags: { [name: string]: Flag },

    /**
     * Your {@link http://support.screeps.com/hc/en-us/articles/203086021-Territory-control Global Control Level}, an object with the following properties :
     */
    gcl: {

        /**
         * The current level.
         */
        level: number,

        /**
         * The current progress to the next level.
         */
        progress: number,

        /**
         * The progress required to reach the next level.
         */
        progressTotal: number,
    },

    /**
     * A global object representing world map. Use it to navigate between rooms. The object is accessible via {@link Game.map} property.
     */
    map: {
        /**
         * List all exits available from the room with the given name.
         *
         * This method has low CPU cost.
         *
         * @param {string} roomName The room name.
         *
         * @return {object | null} The exits information in the following format, or null if the room not found.
         *
         * <code>
         * {
         *     "1": "W8N4",    // TOP
         *     "3": "W7N3",    // RIGHT
         * 	"5": "W8N2",    // BOTTOM
         * 	"7": "W9N3"     // LEFT
         * }
         * </code>
         *
         * @example
         * const exits = Game.map.describeExits('W8N3');
         */
        describeExits(roomName: string): { [dirrection: number]: string },

        /**
         * Find the exit direction from the given room en route to another room.
         *
         * This method has high CPU cost.
         *
         * @param {string | Room} fromRoom Start room name or room object.
         * @param {string | Room} toRoom Finish room name or room object.
         * @param {IRoomPathOpts} opts (optional) An object with the pathfinding options. See <code>{@link findRoute}</code>.
         *
         * @return {number} The room direction constant, one of the following:
         * <ul>
         *     <li>{@link FIND_EXIT_TOP}</code></li>
         *     <li>{@link FIND_EXIT_RIGHT}</code></li>
         *     <li>{@link FIND_EXIT_BOTTOM}</code></li>
         *     <li>{@link FIND_EXIT_LEFT}</code></li>
         * </ul>
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
         * if(creep.room != anotherRoomName) {
         *     const exitDir = Game.map.findExit(creep.room, anotherRoomName);
         *     const exit = creep.pos.findClosestByRange(exitDir);
         *     creep.moveTo(exit);
         * }
         * else {
         *     // go to some place in another room
         * }
         *
         * @example
         * creep.moveTo(new RoomPosition(25, 25, anotherRoomName));
         */
        findExit(fromRoom: string | Room, toRoom: string | Room, opts?: IRoomPathOpts): number,

        /**
         * Find route from the given room to another room.
         *
         * This method has high CPU cost.
         *
         * @param {string | Room} fromRoom Start room name or room object.
         * @param {string | Room} toRoom Finish room name or room object.
         * @param {object} opts (optional) An object with the following options:
         *                    <ul>
         *                        <li>
         *                            <div class="api-arg-title">routeCallback</div>
         *                            <div class="api-arg-type">function</div>
         *                            <div class="api-arg-desc">This callback accepts two arguments: <code>function(roomName, fromRoomName)</code>. It can be used to calculate the cost of entering that room. You can use this to do things like prioritize your own rooms, or avoid some rooms. You can return a floating point cost or <code>Infinity</code> to block the room.</div>
         *                        </li>
         *                    </ul>
         *
         * @return {number} The route array in the following format:
         *
         * <code>
         * [
         *     { exit: FIND_EXIT_RIGHT, room: 'arena21' },
         *     { exit: FIND_EXIT_BOTTOM, room: 'arena22' },
         *     ...
         * ]
         * </code>Or one of the following error codes:
         * <table>
         *   <tr>
         *     <td>{@link ERR_NO_PATH}</td>
         *     <td>Path can not be found.</td>
         *   </tr>
         * </table>
         *
         * @example
         * const route = Game.map.findRoute(creep.room, anotherRoomName);
         * if(route.length > 0) {
         *     console.log('Now heading to room '+route[0].room);
         *     const exit = creep.pos.findClosestByRange(route[0].exit);
         *     creep.moveTo(exit);
         * }
         *
         * @example
         * const route = Game.map.findRoute(creep.room, anotherRoomName, {
         * 	routeCallback(roomName, fromRoomName) {
         * 		if(roomName == 'W10S10') {	// avoid this room
         * 			return Infinity;
         * 		}
         * 		return 1;
         * 	}});
         *
         * @example
         * let from = new RoomPosition(25, 25, 'E1N1');
         * let to = new RoomPosition(25, 25, 'E4N1');
         *
         * // Use <code>findRoute</code> to calculate a high-level plan for this path,
         * // prioritizing highways and owned rooms
         * let allowedRooms = { [ from.roomName ]: true };
         * Game.map.findRoute(from.roomName, to.roomName, {
         * 	routeCallback(roomName) {
         * 		let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
         * 		let isHighway = (parsed[1] % 10 === 0) ||
         * 		                (parsed[2] % 10 === 0);
         * 		let isMyRoom = Game.rooms[roomName] &&
         * 			Game.rooms[roomName].controller &&
         * 			Game.rooms[roomName].controller.my;
         * 		if (isHighway || isMyRoom) {
         * 			return 1;
         * 		} else {
         * 			return 2.5;
         * 		}
         * 	}
         * }).forEach(function(info) {
         * 	allowedRooms[info.room] = true;
         * });
         *
         * // Invoke PathFinder, allowing access only to rooms from <code>findRoute</code>
         * let ret = PathFinder.search(from, to, {
         * 	roomCallback(roomName) {
         * 		if (allowedRooms[roomName] === undefined) {
         * 			return false;
         * 		}
         * 	}
         * });
         *
         * console.log(ret.path);
         */
        findRoute(fromRoom: string | Room, toRoom: string | Room, opts?: IRoomPathOpts): number | { exit: number, room: string }[],

        /**
         * Get the linear distance (in rooms) between two rooms. You can use this function to estimate the energy cost of sending resources through terminals, or using observers and nukes.
         *
         * This method has insignificant CPU cost.
         *
         * @param {string} roomName1 The name of the first room.
         * @param {string} roomName2 The name of the second room.
         * @param {boolean} continuous (optional) Whether to treat the world map continuous on borders. Set to true if you want to calculate the trade or terminal send cost. Default is false.
         *
         * @return {number} A number of rooms between the given two rooms.
         *
         * @example
         * Game.map.getRoomLinearDistance('W1N1', 'W4N2'); // 3
         * Game.map.getRoomLinearDistance('E65S55','W65S55', false) // 131
         * Game.map.getRoomLinearDistance('E65S55','W65S55', true) // 11
         */
        getRoomLinearDistance(roomName1: string, roomName2: string, continuous?: boolean): number,

        /**
         * Get terrain type at the specified room position. This method works for any room in the world even if you have no access to it.
         *
         * This method has low CPU cost.
         *
         * @param {RoomPosition} pos The position object.
         *
         * @return {string} One of the following string values:
         * <ul>
         *                <li><code>plain</code></li>
         *                <li><code>swamp</code></li>
         *                <li><code>wall</code></li>
         *            </ul>
         *
         * @example
         * console.log(Game.map.getTerrainAt(new RoomPosition(25,20,'W10N10'));
         */
        getTerrainAt(pos: RoomPosition): string,

        /**
         * Get terrain type at the specified room position. This method works for any room in the world even if you have no access to it.
         *
         * This method has low CPU cost.
         *
         * @param {number} x X position in the room.
         * @param {number} y Y position in the room.
         * @param {string} roomName The room name.
         *
         * @return {string} One of the following string values:
         * <ul>
         *                <li><code>plain</code></li>
         *                <li><code>swamp</code></li>
         *                <li><code>wall</code></li>
         *            </ul>
         *
         * @example
         * console.log(Game.map.getTerrainAt(25,20,'W10N10'));
         */
        getTerrainAt(x: number, y: number, roomName: string): string,

        /**
         * Check if the room is available to move into.
         *
         * This method has medium CPU cost.
         *
         * @param {string} roomName The room name.
         *
         * @return {boolean} A boolean value.
         *
         * @example
         * if(Game.map.isRoomAvailable(room.name)) {
         *     creep.moveTo(room.getPositionAt(25,25));
         * }
         */
        isRoomAvailable(roomName: string): boolean,
    },

    /**
     * A global object representing the in-game market. You can use this object to track resource transactions to/from your terminals, and your buy/sell orders. The object is accessible via the singleton {@link Game.market} property.
     *
     * Learn more about the market system from {@link http://docs.screeps.com/market.html this article}.
     */
    market: {
        /**
         * Your current credits balance.
         */
        credits: number,

        /**
         * An array of the last 100 incoming transactions to your terminals with the following format:
         *
         * @example
         * [{
         *     transactionId : "56dec546a180ce641dd65960",
         *     time : 10390687,
         *     sender : {username: "Sender"},
         *     recipient : {username: "Me"},
         *     resourceType : "U",
         *     amount : 100,
         *     from : "W0N0",
         *     to : "W10N10",
         *     description : "trade contract #1",
         * 	order: {		// optional
         * 		id : "55c34a6b5be41a0a6e80c68b",
         * 		type : "sell",
         * 		price : 2.95
         * 	}
         * }]
         */
        incomingTransactions: ITransaction[],

        /**
         * An array of the last 100 outgoing transactions from your terminals with the following format:
         *
         * @example
         * [{
         *     transactionId : "56dec546a180ce641dd65960",
         *     time : 10390687,
         *     sender : {username: "Me"},
         *     recipient : {username: "Recipient"},
         *     resourceType : "U",
         *     amount : 100,
         *     from : "W0N0",
         *     to : "W10N10",
         *     description : "trade contract #1",
         * 	order: {		// optional
         * 		id : "55c34a6b5be41a0a6e80c68b",
         * 		type : "sell",
         * 		price : 2.95
         * 	}
         * }]
         */
        outgoingTransactions: ITransaction[],

        /**
         * An object with your active and inactive buy/sell orders on the market.
         *
         * @example
         * {
         * 	"55c34a6b5be41a0a6e80c68b": {
         * 		id : "55c34a6b5be41a0a6e80c68b",
         * 		created : 13131117,
         * 		active: true,
         * 		type : "sell"
         * 		resourceType : "OH",
         * 		roomName : "W1N1",
         * 		amount : 15821,
         * 		remainingAmount : 30000,
         * 		totalAmount : 50000,
         * 		price : 2.95
         * 	},
         * 	"55c34a6b52411a0a6e80693a": {
         * 		id : "55c34a6b52411a0a6e80693a",
         * 		created : 13134122,
         * 		active: true,
         * 		type : "buy"
         * 		resourceType : "energy",
         * 		roomName : "W1N1",
         * 		amount : 94000,
         * 		remainingAmount : 94000,
         * 		totalAmount : 94000
         * 		price : 0.45
         * 	},
         * 	"55c34a6b5be41a0a6e80c123": {
         * 		id : "55c34a6b5be41a0a6e80c123",
         * 		created : 13105123,
         * 		active: false,
         * 		type : "sell"
         * 		resourceType : "token",
         * 		amount : 0,
         * 		remainingAmount : 10,
         * 		totalAmount : 10,
         * 		price : 50000
         * 	}
         * }
         */
        orders: { [id: string]: IOrderFull },

        /**
         * Estimate the energy transaction cost of {@link StructureTerminal.send} and {@link Game.market.deal} methods.
         * The formula:
         *
         * <code>
         * Math.ceil( amount * ( 1 - Math.exp(-distanceBetweenRooms/30) ) )
         * </code>
         *
         * This method has insignificant CPU cost.
         *
         * @param {number} amount Amount of resources to be sent.         *
         * @param {string} roomName1 The name of the first room.
         * @param {string} roomName2 The name of the second room.
         *
         * @return {number} The amount of energy required to perform the transaction.
         *
         * @example
         * const cost = Game.market.calcTransactionCost(1000, 'W0N0', 'W10N5');
         * // -> 284 energy units
         */
        calcTransactionCost(amount: number, roomName1: string, roomName2: string): number,

        /**
         * Cancel a previously created order. The 5% fee is not returned.
         *
         * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
         *
         * @param {string} orderId The order ID as provided in <code>Game.market.orders</code>.
         *
         * @return {number} One of the following codes:
         * <table>
         *   <tr>
         *     <td>{@link OK}</td>
         *     <td>The operation has been scheduled successfully.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_INVALID_ARGS}</td>
         *     <td>The order ID is not valid.</td>
         *   </tr>
         * </table>
         *
         * @example
         * for(const id in Game.market.orders) {
         *     Game.market.cancelOrder(id);
         * }
         */
        cancelOrder(orderId: string): number,

        /**
         * Change the price of an existing order. If <code>newPrice</code> is greater than old price, you will be charged <code>(newPrice-oldPrice)*remainingAmount*0.05</code> credits.
         *
         * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
         *
         * @param {string} orderId The order ID as provided in <code>Game.market.orders</code>.
         * @param {number} newPrice The new order price.
         *
         * @return {number} One of the following codes:
         * <table>
         *   <tr>
         *     <td>{@link OK}</td>
         *     <td>The operation has been scheduled successfully.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_OWNER}</td>
         *     <td>You are not the owner of the room's terminal or there is no terminal.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
         *     <td>You don't have enough credits to pay a fee.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_INVALID_ARGS}</td>
         *     <td>The arguments provided are invalid.</td>
         *   </tr>
         * </table>
         *
         * @example
         * Game.market.changeOrderPrice('57bec1bf77f4d17c4c011960', 9.95);
         */
        changeOrderPrice(orderId: string, newPrice: number): number,

        /**
         * Create a market order in your terminal. You will be charged <code>price*amount*0.05</code> credits when the order is placed. The maximum orders count is 50 per player. You can create an order at any time with any amount, it will be automatically activated and deactivated depending on the resource/credits availability.
         *
         * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
         *
         * @param {string} type The order type, either <code>ORDER_SELL</code> or <code>ORDER_BUY</code>.
         * @param {string} resourceType Either one of the <code>RESOURCE_*</code> constants or <code>SUBSCRIPTION_TOKEN</code>. If your Terminal doesn't have the specified resource, the order will be temporary inactive.
         * @param {number} price The price for one resource unit in credits. Can be a decimal number.
         * @param {number} totalAmount The amount of resources to be traded in total.
         * @param {string} roomName (optional) The room where your order will be created. You must have your own Terminal structure in this room, otherwise the created order will be temporary inactive. This argument is not used when <code>resourceType</code> equals to <code>SUBSCRIPTION_TOKEN</code>.
         *
         * @return {number} One of the following codes:
         * <table>
         *   <tr>
         *     <td>{@link OK}</td>
         *     <td>The operation has been scheduled successfully.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_OWNER}</td>
         *     <td>You are not the owner of the room's terminal or there is no terminal.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
         *     <td>You don't have enough credits to pay a fee.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_FULL}</td>
         *     <td>You cannot create more than 50 orders.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_INVALID_ARGS}</td>
         *     <td>The arguments provided are invalid.</td>
         *   </tr>
         * </table>
         *
         * @example
         * Game.market.createOrder(ORDER_SELL, RESOURCE_GHODIUM, 9.95, 10000, "W1N1");
         */
        createOrder(type: string, resourceType: string, price: number, totalAmount: number, roomName?: string): number,

        /**
         * Execute a trade deal from your Terminal in <code>yourRoomName</code> to another player's Terminal using the specified buy/sell order. Your Terminal will be charged energy units of transfer cost regardless of the order resource type. You can use {@link calcTransactionCost Game.market.calcTransactionCost} method to estimate it. When multiple players try to execute the same deal, the one with the shortest distance takes precedence. You cannot execute more than 10 deals during one tick.
         *
         * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
         *
         * @param {string} orderId The order ID as provided in <code>Game.market.getAllOrders</code>.
         * @param {number} amount The amount of resources to transfer.
         * @param {string} yourRoomName (optional) The name of your room which has to contain an active Terminal with enough amount of energy. This argument is not used when the order resource type equals to <code>SUBSCRIPTION_TOKEN</code>.
         *
         * @return {number} One of the following codes:
         * <table>
         *   <tr>
         *     <td>{@link OK}</td>
         *     <td>The operation has been scheduled successfully.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_OWNER}</td>
         *     <td>You don't have a terminal in the target room.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
         *     <td>You don't have enough credits or resource units.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_FULL}</td>
         *     <td>You cannot execute more than 10 deals during one tick.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_INVALID_ARGS}</td>
         *     <td>The arguments provided are invalid.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_TIRED}</td>
         *     <td>The target terminal is still cooling down.</td>
         *   </tr>
         * </table>
         *
         * @example
         * Game.market.deal('57cd2b12cda69a004ae223a3', 1000, "W1N1");
         *
         * @example
         * const amountToBuy = 2000, maxTransferEnergyCost = 500;
         * const orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_GHODIUM});
         *
         * for(let i=0; i<orders.length; i++) {
         *     const transferEnergyCost = Game.market.calcTransactionCost(
         *         amountToBuy, 'W1N1', orders[i].roomName);
         *
         *     if(transferEnergyCost < maxTransferEnergyCost) {
         *         Game.market.deal(orders[i].id, amountToBuy, "W1N1");
         *         break;
         *     }
         * }
         */
        deal(orderId: string, amount: number, yourRoomName?: string): number,

        /**
         * Add more capacity to an existing order. It will affect <code>remainingAmount</code> and <code>totalAmount</code> properties. You will be charged <code>price*addAmount*0.05</code> credits.
         *
         * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
         *
         * @param {string} orderId The order ID as provided in <code>Game.market.orders</code>.
         * @param {number} addAmount How much capacity to add. Cannot be a negative value.
         *
         * @return {number} One of the following codes:
         * <table>
         *   <tr>
         *     <td>{@link OK}</td>
         *     <td>The operation has been scheduled successfully.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
         *     <td>You don't have enough credits to pay a fee.</td>
         *   </tr>
         *   <tr>
         *     <td>{@link ERR_INVALID_ARGS}</td>
         *     <td>The arguments provided are invalid.</td>
         *   </tr>
         * </table>
         *
         * @example
         * Game.market.extendOrder('57bec1bf77f4d17c4c011960', 10000);
         */
        extendOrder(orderId: string, addAmount: number): number,

        /**
         * Get other players' orders currently active on the market.
         *
         * This method has high CPU cost.
         *
         * @param {object | Function} filter (optional) An object or function that will filter the resulting list using the {@link https://lodash.com/docs#filter lodash.filter} method.
         *
         * @return {} An orders array in the following form:
         *
         * property | description
         * ---|---
         * <code>id</code> | The unique order ID.
         * <code>created</code> | The order creation time in game ticks.
         * <code>type</code> | Either <code>ORDER_SELL</code> or <code>ORDER_BUY</code>.
         * <code>resourceType</code> | Either one of the <code>RESOURCE_*</code> constants or <code>SUBSCRIPTION_TOKEN</code>.
         * <code>roomName</code> | The room where this order is placed.
         * <code>amount</code> | Currently available amount to trade.
         * <code>remainingAmount</code> | How many resources are left to trade via this order.
         *
         * @example
         * Game.market.getAllOrders();
         *
         * @example
         * Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_GHODIUM});
         *
         * @example
         * const targetRoom = "W1N1";
         * Game.market.getAllOrders(order => order.resourceType == RESOURCE_GHODIUM &&
         *    order.type == ORDER_SELL &&
         *     Game.market.calcTransactionCost(1000, targetRoom, order.roomName) < 500);
         *
         * @example
         * // Output:
         *
         * [{
         * 	id : "55c34a6b5be41a0a6e80c68b",
         * 	created : 13131117,
         * 	type : "sell"
         * 	resourceType : "OH",
         * 	roomName : "W1N1",
         * 	amount : 15821,
         * 	remainingAmount : 30000,
         * 	price : 2.95
         * }, {
         * 	id : "55c34a6b52411a0a6e80693a",
         * 	created : 13134122,
         * 	type : "buy"
         * 	resourceType : "energy",
         * 	roomName : "W1N1",
         * 	amount : 94000,
         * 	remainingAmount : 94000,
         * 	price : 0.45
         * }, {
         * 	id : "55c34a6b5be41a0a6e80c123",
         * 	created : 13105123,
         * 	type : "sell"
         * 	resourceType : "token",
         * 	amount : 3,
         * 	remainingAmount : 10,
         * 	price : 50000
         * }]
         */
        getAllOrders(filter?: { (order: IOrderFull): boolean }): IOrderFull[],

        /**
         * Retrieve info for specific market order.
         *
         * This method has low CPU cost.
         *
         * @param {string} id The order ID.
         *
         * @return {IOrderFull} An object with the order info. See {@link getAllOrders} for properties explanation.
         *
         * @example
         * const order = Game.market.getOrderById('55c34a6b5be41a0a6e80c123');
         */
        getOrderById(id: string): IOrderFull,
    },

    /**
     * An object with your global resources that are bound to the account, like subscription tokens. Each object key is a resource constant, values are resources amounts.
     */
    resources: { [type: string]: number },

    /**
     * A hash containing all the rooms available to you with room names as hash keys. A room is visible if you have a creep or an owned structure in it.
     */
    rooms: { [name: string]: Room },

    /**
     * A hash containing all your spawns with spawn names as hash keys.
     *
     * @example
     * for(const i in Game.spawns) {
	 *     Game.spawns[i].createCreep(body);
	 * }
     */
    spawns: { [name: string]: StructureSpawn },

    /**
     * A hash containing all your structures with structure id as hash keys.
     */
    structures: { [id: string]: Structure },

    /**
     * System game tick counter. It is automatically incremented on every tick. {@link http://support.screeps.com/hc/en-us/articles/203032752-Understanding-game-loop-time-and-ticks Learn more}
     *
     * @example
     * console.log(Game.time);
     */
    time: number,

    /**
     * Get an object with the specified unique ID. It may be a game object of any type. Only objects from the rooms which are visible to you can be accessed.
     *
     * This method has low CPU cost.
     *
     * @param {string} id The unique identificator.
     *
     * @return {RoomObject} Returns an object instance or null if it cannot be found.
     *
     * @example
     * creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
     * const source = Game.getObjectById(creep.memory.sourceId);
     */
    getObjectById(id: string): RoomObject,

    /**
     * Send a custom message at your profile email. This way, you can set up notifications to yourself on any occasion within the game. You can schedule up to 20 notifications during one game tick. Not available in the Simulation Room.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} message Custom text which will be sent in the message. Maximum length is 1000 characters.
     * @param {number} groupInterval If set to 0 (default), the notification will be scheduled immediately. Otherwise, it will be grouped with other notifications and mailed out later using the specified time in minutes.
     *
     * @example
     * if(creep.hits < creep.memory.lastHits) {
	 *     Game.notify('Creep '+creep+' has been attacked at '+creep.pos+'!');
	 * }
     * creep.memory.lastHits = creep.hits;
     *
     * @example
     * if(Game.spawns['Spawn1'].energy == 0) {
	 *     Game.notify(
	 *         'Spawn1 is out of energy',
	 *         180  // group these notifications for 3 hours
	 *     );
	 * }
     */
    notify(message: string, groupInterval = 0): number,
}

interface IRoomPathOpts {
    /**
     * This callback accepts two arguments: <code>function(roomName, fromRoomName)</code>. It can be used to calculate the cost of entering that room. You can use this to do things like prioritize your own rooms, or avoid some rooms. You can return a floating point cost or <code>Infinity</code> to block the room.
     *
     * @param roomName {string} Name of exit destination room
     * @param fromRoomName {string} Name of source destination room
     */
    routeCallback?(roomName: string, fromRoomName: string): number
}

interface ITransaction {
    transactionId: string,
    time: number,
    sender: { username: string },
    recipient: { username: string },
    resourceType: string,
    amount: number,
    from: string,
    to: string,
    description: string,
    order?: IOrderMin
}

interface IOrderMin {
    /**
     * The unique order ID
     */
    id: string,

    /**
     * Either <code>ORDER_SELL</code> or <code>ORDER_BUY</code>.
     */
    type: string,

    price: number
}

interface IOrderFull extends IOrderMin {
    /**
     * The order creation time in game ticks.
     */
    created: number,

    active?: boolean,

    /**
     * Either one of the <code>RESOURCE_*</code> constants or <code>SUBSCRIPTION_TOKEN</code>.
     */
    resourceType: string,

    /**
     * The room where this order is placed.
     */
    roomName: string,

    /**
     * Currently available amount to trade.
     */
    amount: number,

    /**
     * How many resources are left to trade via this order.
     */
    remainingAmount: number,

    totalAmount?: number,
}