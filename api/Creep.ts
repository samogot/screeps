/**
 * Creeps are your units. Creeps can move, harvest energy, construct structures, attack another creeps, and perform other actions. Each creep consists of up to 50 body parts with the following possible types:
 *
 * <table>
 *     <tr>
 *         <th style="width: 20%;">Body part</th>
 *         <th style="width: 8%;">Build cost</th>
 *         <th>Effect per one body part</th>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #a9b7c6;">MOVE</code></td>
 *         <td>50</td>
 *         <td>Decreases fatigue by 2 points per tick.</td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #ffe56d;">WORK</code></td>
 *         <td>100</td>
 *         <td>
 *             <p>Harvests 2 energy units from a source per tick.</p>
 *             <p>Harvests 1 mineral unit from a deposit per tick.</p>
 *             <p>Builds a structure for 5 energy units per tick.</p>
 *             <p>Repairs a structure for 100 hits per tick consuming 1 energy unit per tick.</p>
 *             <p>Dismantles a structure for 50 hits per tick returning 0.25 energy unit per tick.</p>
 *             <p>Upgrades a controller for 1 energy unit per tick.</p>
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #777;">CARRY</code></td>
 *         <td>50</td>
 *         <td>Can contain up to 50 resource units.</td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #f93842;">ATTACK</code></td>
 *         <td>80</td>
 *         <td>Attacks another creep/structure with 30 hits per tick in a short-ranged attack.</td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #5d80b2;">RANGED_ATTACK</code></td>
 *         <td>150</td>
 *         <td>
 *             <p>Attacks another single creep/structure with 10 hits per tick in a long-range attack up to 3 squares long.</p>
 *             <p>Attacks all hostile creeps/structures within 3 squares range with 1-4-10 hits (depending on the range).</p>
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #65fd62;">HEAL</code></td>
 *         <td>250</td>
 *         <td>Heals self or another creep restoring 12 hits per tick in short range or 4 hits per tick at a distance.</td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #b99cfb;">CLAIM</code></td>
 *         <td>600</td>
 *         <td>
 *             <p>Claims a neutral room controller.</p>
 *             <p>Reserves a neutral room controller for 1 tick per body part.</p>
 *             <p>Attacks a hostile room controller downgrade or reservation timer with 1 tick per 5 body parts.</p>
 *             <p>A creep with this body part will have a reduced life time of 500 ticks and cannot be renewed.</p>
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><code style="color: #fff;">TOUGH</code></td>
 *         <td>10</td>
 *         <td>No effect, just additional hit points to the creep's body. Can be boosted to resist damage.</td>
 *     </tr>
 *
 * </table>
 */
interface Creep extends RoomObject {
    /**
     * An array describing the creep’s body. Each element contains the following properties:
     */
    body: {

        /**
         * If the body part is boosted, this property specifies the mineral type which is used for boosting. One of the <code>RESOURCE_*</code> constants. {@link http://docs.screeps.com/minerals.html Learn more}
         */
        boost?: string,

        /**
         * One of the body part types constants.
         */
        type: string,

        /**
         * The remaining amount of hit points of this body part.
         */
        hits: number,
    }[],

    /**
     * An object with the creep's cargo contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. Use {@link https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg lodash.sum} to get the total amount of contents:
     *
     * @example
     * const total = _.sum(creep.carry);
     */
    carry: undefined,

    /**
     * The total amount of resources the creep can carry.
     */
    carryCapacity: number,

    /**
     * The movement fatigue indicator. If it is greater than zero, the creep cannot move.
     */
    fatigue: number,

    /**
     * The current amount of hit points of the creep.
     */
    hits: number,

    /**
     * The maximum amount of hit points of the creep.
     */
    hitsMax: number,

    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * A shorthand to <code>Memory.creeps[creep.name]</code>. You can use it for quick access the creep’s specific memory data object. {@link http://docs.screeps.com/global-objects.html#Memory-object Learn more about memory}
     *
     * @example
     * creep.memory.task = 'building';
     */
    memory: any,

    /**
     * Whether it is your creep or foe.
     */
    my: boolean,

    /**
     * Creep’s name. You can choose the name while creating a new creep, and it cannot be changed later. This name is a hash key to access the creep via the {@link Game.creeps} object.
     */
    name: string,

    /**
     * An object with the creep’s owner info containing the following properties:
     */
    owner: {

        /**
         * The name of the owner user.
         */
        username: string,
    },

    /**
     * The text message that the creep was saying at the last tick.
     */
    saying: string,

    /**
     * Whether this creep is still being spawned.
     */
    spawning: boolean,

    /**
     * The remaining amount of game ticks after which the creep will die.
     */
    ticksToLive: number,

    /**
     * Attack another creep or structure in a short-ranged attack. Requires the <code>ATTACK</code> body part. If the target is inside a rampart, then the rampart is attacked instead. The target has to be at adjacent square to the creep. If the target is a creep with <code>ATTACK</code> body parts and is not inside a rampart, it will automatically hit back at the attacker.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep | Structure} target The target object to be attacked.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid attackable object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>ATTACK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
     * if(target) {
	 *     if(creep.attack(target) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(target);
	 *     }
	 * }
     */
    attack(target: Creep | Structure): number,

    /**
     * Decreases the controller's downgrade or reservation timer for 1 tick per every 5 <code>CLAIM</code> body parts (so the creep must have at least 5x<code>CLAIM</code>). The controller under attack cannot be upgraded for the next 1,000 ticks. The target has to be at adjacent square to the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureController} target The target controller object.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid owned or reserved controller object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are not enough <code>CLAIM</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.room.controller && !creep.room.controller.my) {
	 *     if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(creep.room.controller);
	 *     }
	 * }
     */
    attackController(target: StructureController): number,

    /**
     * Build a structure at the target construction site using carried energy. Requires <code>WORK</code> and <code>CARRY</code> body parts. The target has to be within 3 squares range of the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {ConstructionSite} target The target construction site to be built.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not have any carried energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid construction site object or the structure cannot be built here (probably because of a creep at the same square).</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>WORK</code> body parts in this creep’s body.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient. {@link http://docs.screeps.com/control.html#Room-Controller-Level Learn more}</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
     * if(target) {
	 *     if(creep.build(target) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(target);
	 *     }
	 * }
     */
    build(target: ConstructionSite): number,

    /**
     * Cancel the order given during the current game tick.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} methodName The name of a creep's method to be cancelled.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been cancelled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_FOUND}</td>
     *     <td>The order with the specified name is not found.</td>
     *   </tr>
     * </table>
     *
     * @example
     * creep.move(LEFT);
     * creep.cancelOrder('move');
     * //The creep will not move in this game tick
     */
    cancelOrder(methodName: string): number,

    /**
     * Claims a neutral controller under your control. Requires the <code>CLAIM</code> body part. The target has to be at adjacent square to the creep. You need to have the corresponding Global Control Level in order to claim a new room. If you don't have enough GCL, consider {@link reserveController reserving} this room instead. {@link http://docs.screeps.com/control.html#Global-Control-Level Learn more}
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureController} target The target controller object.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid neutral controller object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>You cannot claim more than 3 rooms in the Novice Area.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>CLAIM</code> body parts in this creep’s body.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_GCL_NOT_ENOUGH}</td>
     *     <td>Your Global Control Level is not enough.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.room.controller) {
	 *     if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(creep.room.controller);
	 *     }
	 * }
     */
    claimController(target: StructureController): number,

    /**
     * Dismantles any (even hostile) structure returning 50% of the energy spent on its repair. Requires the <code>WORK</code> body part. If the creep has an empty <code>CARRY</code> body part, the energy is put into it; otherwise it is dropped on the ground. The target has to be at adjacent square to the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Structure} target The target structure.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>WORK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_STRUCTURES,
     *    {filter: {structureType: STRUCTURE_WALL}});
     * if(target) {
	 *     if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(target);
	 *     }
	 * }
     */
    dismantle(target: Structure): number,

    /**
     * Drop this resource on the ground.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} resourceType One of the <code>RESOURCE_*</code> constants.
     * @param {number} amount (optional) The amount of resource units to be dropped. If omitted, all the available carried amount is used.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not have the given amount of energy.</td>
     *   </tr>
     * </table>
     *
     * @example
     * creep.drop(RESOURCE_ENERGY);
     *
     * @example
     * // drop all resources
     * for(const resourceType in creep.carry) {
	 * 	creep.drop(resourceType);
	 * }
     */
    drop(resourceType: string, amount?: number): number,

    /**
     * Add one more available safe mode activation to a room controller. The creep has to be at adjacent square to the target room controller and have 1000 ghodium resource.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureController} target The target room controller.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not have enough ghodium.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid construction site object or the structure cannot be built here (probably because of a creep at the same square).</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.generateSafeMode(creep.room.controller) == ERR_NOT_IN_RANGE) {
	 *     creep.moveTo(creep.room.controller);
	 * }
     */
    generateSafeMode(target: StructureController): number,

    /**
     * Get the quantity of live body parts of the given type. Fully damaged parts do not count.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} type A body part type, one of the following body part constants:
     *                    <ul>
     *                        <li><code>MOVE</code></li>
     *                        <li><code>WORK</code></li>
     *                        <li><code>CARRY</code></li>
     *                        <li><code>ATTACK</code></li>
     *                        <li><code>RANGED_ATTACK</code></li>
     *                        <li><code>HEAL</code></li>
     *                        <li><code>TOUGH</code></li>
     *                    </ul>
     *
     * @return {} A number representing the quantity of body parts.
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
	 *     filter: function(object) {
	 *         return object.getActiveBodyparts(ATTACK) == 0;
	 *     }
	 * });
     * if(target) {
	 *     creep.moveTo(target);
	 * }
     */
    getActiveBodyparts(type: string),

    /**
     * Harvest energy from the source or minerals from the mineral deposit. Requires the <code>WORK</code> body part. If the creep has an empty <code>CARRY</code> body part, the harvested resource is put into it; otherwise it is dropped on the ground. The target has to be at an adjacent square to the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Source | Mineral} target The object to be harvested.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep, or the room controller is owned or reserved by another player.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_FOUND}</td>
     *     <td>Extractor not found. You must build an extractor structure to harvest minerals. {@link http://docs.screeps.com/minerals.html Learn more}</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The target source does not contain any harvestable energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid source object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>WORK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
     * if(target) {
	 *     if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(target);
	 *     }
	 * }
     */
    harvest(target: Source | Mineral): number,

    /**
     * Heal self or another creep. It will restore the target creep’s damaged body parts function and increase the hits counter. Requires the <code>HEAL</code> body part. The target has to be at adjacent square to the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target creep object.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>HEAL</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
	 *     filter: function(object) {
	 *         return object.hits < object.hitsMax;
	 *     }
	 * });
     * if(target) {
	 *     if(creep.heal(target) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(target);
	 *     }
	 * }
     */
    heal(target: Creep): number,

    /**
     * Move the creep one square in the specified direction. Requires the <code>MOVE</code> body part.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {number} direction One of the following constants:
     *                    <ul>
     *                        <li><code>TOP</code></li>
     *                        <li><code>TOP_RIGHT</code></li>
     *                        <li><code>RIGHT</code></li>
     *                        <li><code>BOTTOM_RIGHT</code></li>
     *                        <li><code>BOTTOM</code></li>
     *                        <li><code>BOTTOM_LEFT</code></li>
     *                        <li><code>LEFT</code></li>
     *                        <li><code>TOP_LEFT</code></li>
     *                    </ul>
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The fatigue indicator of the creep is non-zero.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no MOVE body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * creep.move(RIGHT);
     *
     * @example
     * const path = creep.pos.findPathTo(Game.flags.Flag1);
     * if(path.length > 0) {
	 * 	creep.move(path[0].direction);
	 * }
     */
    move(direction: number): number,

    /**
     * Move the creep using the specified predefined path. Requires the <code>MOVE</code> body part.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Array|string} path A path value as returned from {@link Room.findPath}, {@link RoomPosition.findPathTo}, or {@link PathFinder.PathFinder-search PathFinder.search} methods. Both array form and serialized string form are accepted.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_FOUND}</td>
     *     <td>The specified path doesn't match the creep's location.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td><code>path</code> is not a valid path array.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The fatigue indicator of the creep is non-zero.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>MOVE</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const path = spawn.room.findPath(spawn, source);
     * creep.moveByPath(path);
     *
     * @example
     * if(!creep.memory.path) {
	 *     creep.memory.path = creep.pos.findPathTo(target);
	 * }
     * creep.moveByPath(creep.memory.path);
     */
    moveByPath(path: IPathItem[] | string): number,

    /**
     * Find the optimal path to the target within the same room and move to it. A shorthand to consequent calls of {@link RoomPosition.findPathTo pos.findPathTo()} and {@link Creep.move move()} methods. If the target is in another room, then the corresponding exit will be used as a target. Requires the <code>MOVE</code> body part.
     *
     * This method has high CPU cost.
     *
     * @param {number} x X position of the target in the same room.
     * @param {number} y Y position of the target in the same room.
     * @param {IMoveOpts} opts (optional) An object containing additional options:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">reusePath</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">This option enables reusing the path found along multiple game ticks. It allows to save CPU time, but can result in a slightly slower creep reaction behavior. The path is stored into the creep's memory to the <code>_move</code> property. The <code>reusePath</code> value defines the amount of ticks which the path should be reused for. The default value is 5. Increase the amount to save more CPU, decrease to make the movement more consistent. Set to 0 if you want to disable path reusing.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">serializeMemory</div>
     *                            <div class="api-arg-type">boolean</div>
     *                            <div class="api-arg-desc">If <code>reusePath</code> is enabled and this option is set to true, the path will be stored in memory in the short serialized form using {@link Room.serializePath}. The default value is true.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">noPathFinding</div>
     *                            <div class="api-arg-type">boolean</div>
     *                            <div class="api-arg-desc">If this option is set to true, <code>moveTo</code> method will return <code>ERR_NOT_FOUND</code> if there is no memorized path to reuse. This can significantly save CPU time in some cases. The default value is false.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">visualizePathStyle</div>
     *                            <div class="api-arg-type">object</div>
     *                            <div class="api-arg-desc">Draw a line along the creep’s path using {@link http://support.screeps.com/hc/en-us/articles/115000962829-RoomVisual#poly RoomVisual.poly}. You can provide either an empty object or custom style parameters. The default style is equivalent to:
     *                                <pre class="language-javascript"><code>{
	 *     fill: 'transparent',
	 *     stroke: '#fff',
	 *     lineStyle: 'dashed',
	 *     strokeWidth: .15,
	 *     opacity: .1
	 * }</code></pre>
     *                            </div>
     *                        </li>
     *                        <li>Any options supported by {@link Room.findPath} method.</li>
     *                    </ul>
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The fatigue indicator of the creep is non-zero.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no MOVE body parts in this creep’s body.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target provided is invalid.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_PATH}</td>
     *     <td>No path to the target could be found.</td>
     *   </tr>
     * </table>
     *
     * @example
     * {
	 *     fill: 'transparent',
	 *     stroke: '#fff',
	 *     lineStyle: 'dashed',
	 *     strokeWidth: .15,
	 *     opacity: .1
	 * }
     *
     * @example
     * creep.moveTo(10, 20);
     *
     * @example
     * creep.moveTo(Game.flags.Flag1);
     *
     * @example
     * creep.moveTo(new RoomPosition(25, 20, 'W10N5'));
     *
     * @example
     * creep.moveTo(pos, {reusePath: 50});
     *
     * @example
     * // Execute moves by cached paths at first
     * for(const name in Game.creeps) {
	 *     Game.creeps[name].moveTo(target, {noPathFinding: true});
	 * }
     *
     * // Perform pathfinding only if we have enough CPU
     * if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
	 *     for(const name in Game.creeps) {
	 *         Game.creeps[name].moveTo(target);
	 *     }
	 * }
     */
    moveTo(x: number, y: number, opts?: IMoveOpts): number,

    /**
     * Find the optimal path to the target within the same room and move to it. A shorthand to consequent calls of {@link RoomPosition.findPathTo pos.findPathTo()} and {@link Creep.move move()} methods. If the target is in another room, then the corresponding exit will be used as a target. Requires the <code>MOVE</code> body part.
     *
     * This method has high CPU cost.
     *
     * @param {RoomPosition|RoomObject} target Can be a {@link RoomPosition} object or any object containing {@link RoomPosition}. The position doesn't have to be in the same room with the creep.
     * @param {IMoveOpts} opts (optional) An object containing additional options:
     *                    <ul>
     *                        <li>
     *                            <div class="api-arg-title">reusePath</div>
     *                            <div class="api-arg-type">number</div>
     *                            <div class="api-arg-desc">This option enables reusing the path found along multiple game ticks. It allows to save CPU time, but can result in a slightly slower creep reaction behavior. The path is stored into the creep's memory to the <code>_move</code> property. The <code>reusePath</code> value defines the amount of ticks which the path should be reused for. The default value is 5. Increase the amount to save more CPU, decrease to make the movement more consistent. Set to 0 if you want to disable path reusing.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">serializeMemory</div>
     *                            <div class="api-arg-type">boolean</div>
     *                            <div class="api-arg-desc">If <code>reusePath</code> is enabled and this option is set to true, the path will be stored in memory in the short serialized form using {@link Room.serializePath}. The default value is true.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">noPathFinding</div>
     *                            <div class="api-arg-type">boolean</div>
     *                            <div class="api-arg-desc">If this option is set to true, <code>moveTo</code> method will return <code>ERR_NOT_FOUND</code> if there is no memorized path to reuse. This can significantly save CPU time in some cases. The default value is false.</div>
     *                        </li>
     *                        <li>
     *                            <div class="api-arg-title">visualizePathStyle</div>
     *                            <div class="api-arg-type">object</div>
     *                            <div class="api-arg-desc">Draw a line along the creep’s path using {@link http://support.screeps.com/hc/en-us/articles/115000962829-RoomVisual#poly RoomVisual.poly}. You can provide either an empty object or custom style parameters. The default style is equivalent to:
     *                                <pre class="language-javascript"><code>{
	 *     fill: 'transparent',
	 *     stroke: '#fff',
	 *     lineStyle: 'dashed',
	 *     strokeWidth: .15,
	 *     opacity: .1
	 * }</code></pre>
     *                            </div>
     *                        </li>
     *                        <li>Any options supported by {@link Room.findPath} method.</li>
     *                    </ul>
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The fatigue indicator of the creep is non-zero.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no MOVE body parts in this creep’s body.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target provided is invalid.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_PATH}</td>
     *     <td>No path to the target could be found.</td>
     *   </tr>
     * </table>
     *
     * @example
     * {
	 *     fill: 'transparent',
	 *     stroke: '#fff',
	 *     lineStyle: 'dashed',
	 *     strokeWidth: .15,
	 *     opacity: .1
	 * }
     *
     * @example
     * creep.moveTo(10, 20);
     *
     * @example
     * creep.moveTo(Game.flags.Flag1);
     *
     * @example
     * creep.moveTo(new RoomPosition(25, 20, 'W10N5'));
     *
     * @example
     * creep.moveTo(pos, {reusePath: 50});
     *
     * @example
     * // Execute moves by cached paths at first
     * for(const name in Game.creeps) {
	 *     Game.creeps[name].moveTo(target, {noPathFinding: true});
	 * }
     *
     * // Perform pathfinding only if we have enough CPU
     * if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
	 *     for(const name in Game.creeps) {
	 *         Game.creeps[name].moveTo(target);
	 *     }
	 * }
     */
    moveTo(target: RoomPosition | RoomObject, opts?: IMoveOpts): number,

    /**
     * Toggle auto notification when the creep is under attack. The notification will be sent to your account email. Turned on by default.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {boolean} enabled Whether to enable notification or disable.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td><code>enable</code> argument is not a boolean value.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.memory.role == 'scout') {
	 * 	creep.notifyWhenAttacked(false);
	 * }
     * else {
	 * 	creep.notifyWhenAttacked(true);
	 * }
     */
    notifyWhenAttacked(enabled: boolean): number,

    /**
     * Pick up an item (a dropped piece of energy). Requires the <code>CARRY</code> body part. The target has to be at adjacent square to the creep or at the same square.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Resource} target The target object to be picked up.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid object to pick up.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The creep cannot receive any more energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
     * if(target) {
	 *     if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(target);
	 *     }
	 * }
     */
    pickup(target: Resource): number,

    /**
     * A ranged attack against another creep or structure. Requires the <code>RANGED_ATTACK</code> body part. If the target is inside a rampart, the rampart is attacked instead. The target has to be within 3 squares range of the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep | Structure} target The target object to be attacked.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid attackable object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>RANGED_ATTACK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
     * if(targets.length > 0) {
	 *     creep.rangedAttack(targets[0]);
	 * }
     */
    rangedAttack(target: Creep | Structure): number,

    /**
     * Heal another creep at a distance. It will restore the target creep’s damaged body parts function and increase the hits counter. Requires the <code>HEAL</code> body part. The target has to be within 3 squares range of the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target creep object.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>HEAL</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
	 *     filter: function(object) {
	 *         return object.hits < object.hitsMax;
	 *     }
	 * });
     * if(target) {
	 *     creep.moveTo(target);
	 *     if(creep.pos.isNearTo(target)) {
	 *         creep.heal(target);
	 *     }
	 *     else {
	 *         creep.rangedHeal(target);
	 *     }
	 * }
     */
    rangedHeal(target: Creep): number,

    /**
     * A ranged attack against all hostile creeps or structures within 3 squares range. Requires the <code>RANGED_ATTACK</code> body part. The attack power depends on the range to each target. Friendly units are not affected.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>RANGED_ATTACK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
     * if(targets.length > 0) {
	 *     creep.rangedMassAttack();
	 * }
     */
    rangedMassAttack(): number,

    /**
     * Repair a damaged structure using carried energy. Requires the <code>WORK</code> and <code>CARRY</code> body parts. The target has to be within 3 squares range of the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Structure} target The target structure to be repaired.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not carry any energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>WORK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const targets = creep.room.find(FIND_STRUCTURES, {
	 *     filter: object => object.hits < object.hitsMax
	 * });
     *
     * targets.sort((a,b) => a.hits - b.hits);
     *
     * if(targets.length > 0) {
	 *     if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(targets[0]);
	 *     }
	 * }
     */
    repair(target: Structure): number,

    /**
     * Temporarily block a neutral controller from claiming by other players and restore energy sources to their full capacity. Each tick, this command increases the counter of the period during which the controller is unavailable by 1 tick per each <code>CLAIM</code> body part. The maximum reservation period to maintain is 5,000 ticks. The target has to be at adjacent square to the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureController} target The target controller object to be reserved.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid neutral controller object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>CLAIM</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.room.controller) {
	 *     if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(creep.room.controller);
	 *     }
	 * }
     */
    reserveController(target: StructureController): number,

    /**
     * Display a visual speech balloon above the creep with the specified message. The message will be available for one tick. You can read the last message using the <code>saying</code> property. Any valid Unicode characters are allowed, including {@link http://unicode.org/emoji/charts/emoji-style.txt emoji}.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} message The message to be displayed. Maximum length is 10 characters.
     * @param {boolean} public (optional) Set to true to allow other players to see this message. Default is false.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
     * if(hostiles.length > 0) {
	 *     creep.say('OMG!😨');
	 *     creep.moveTo(Game.spawns['Spawn1']);
	 * }
     * else {
	 *     doWork(creep);
	 * }
     */
    say(message: string, public?: boolean): number,

    /**
     * Sign a controller with an arbitrary text visible to all players. This text will appear in the room UI, in the world map, and can be accessed via the API. You can sign unowned and hostile controllers. The target has to be at adjacent square to the creep. Pass an empty string to remove the sign.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureController} target The target controller object to be signed.
     * @param {string} text The sign text. The string is cut off after 100 characters.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid controller object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.room.controller) {
	 *     if(creep.signController(creep.room.controller, "I'm going to claim this room in a few days. I warned ya!") == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(creep.room.controller);
	 *     }
	 * }
     */
    signController(target: StructureController, text: string): number,

    /**
     * Kill the creep immediately.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     * </table>
     */
    suicide(): number,

    /**
     * Transfer resource from the creep to another object. The target has to be at adjacent square to the creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep | Structure} target The target object.
     * @param {string} resourceType One of the <code>RESOURCE_*</code> constants.
     * @param {number} amount (optional) The amount of resources to be transferred. If omitted, all the available carried amount is used.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not have the given amount of resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid object which can contain the specified resource.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target cannot receive any more resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The resources amount is incorrect.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	 * 	creep.moveTo(storage);
	 * }
     *
     * @example
     * // transfer all resources
     * for(const resourceType in creep.carry) {
	 * 	creep.transfer(storage, resourceType);
	 * }
     */
    transfer(target: Creep | Structure, resourceType: string, amount?: number): number,

    /**
     * Upgrade your controller to the next level using carried energy. Upgrading controllers raises your Global Control Level in parallel. Requires <code>WORK</code> and <code>CARRY</code> body parts. The target has to be within 3 squares range of the creep. A fully upgraded level 8 controller can't be upgraded over 15 energy units per tick regardless of creeps abilities. The cumulative effect of all the creeps performing <code>upgradeController</code> in the current tick is taken into account. This limit can be increased by using {@link http://docs.screeps.com/minerals.html ghodium mineral boost}.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureController} target The target controller object to be upgraded.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep or the target controller.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not have any carried energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid controller object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NO_BODYPART}</td>
     *     <td>There are no <code>WORK</code> body parts in this creep’s body.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.room.controller) {
	 *     if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	 *         creep.moveTo(creep.room.controller);
	 *     }
	 * }
     */
    upgradeController(target: StructureController): number,

    /**
     * Withdraw resources from a structure. The target has to be at adjacent square to the creep. Multiple creeps can withdraw from the same structure in the same tick. Your creeps can withdraw resources from hostile structures as well, in case if there is no hostile rampart on top of it.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Structure} target The target object.
     * @param {string} resourceType One of the <code>RESOURCE_*</code> constants.
     * @param {number} amount (optional) The amount of resources to be transferred. If omitted, all the available amount is used.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this creep, or there is a hostile rampart on top of the target.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The creep is still being spawned.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The target does not have the given amount of resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid object which can contain the specified resource.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The creep's carry is full.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The resource amount or type is incorrect.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	 * 	creep.moveTo(storage);
	 * }
     */
    withdraw(target: Structure, resourceType: string, amount?: number): number,
}

interface IMoveOpts extends IPathOpts {
    /**
     * This option enables reusing the path found along multiple game ticks. It allows to save CPU time, but can result in a slightly slower creep reaction behavior. The path is stored into the creep's memory to the <code>_move</code> property. The <code>reusePath</code> value defines the amount of ticks which the path should be reused for. The default value is 5. Increase the amount to save more CPU, decrease to make the movement more consistent. Set to 0 if you want to disable path reusing.
     */
    reusePath?: number,

    /**
     * If <code>reusePath</code> is enabled and this option is set to true, the path will be stored in memory in the short serialized form using {@link Room.serializePath}. The default value is true.
     */
    serializeMemory?: boolean,

    /**
     * If this option is set to true, <code>moveTo</code> method will return <code>ERR_NOT_FOUND</code> if there is no memorized path to reuse. This can significantly save CPU time in some cases. The default value is false.
     */
    noPathFinding?: boolean,

    /**
     * Draw a line along the creep’s path using {@link http://support.screeps.com/hc/en-us/articles/115000962829-RoomVisual#poly RoomVisual.poly}. You can provide either an empty object or custom style parameters. The default style is equivalent to:
     *<code>{
     *     fill: 'transparent',
     *     stroke: '#fff',
     *     lineStyle: 'dashed',
     *     strokeWidth: .15,
     *     opacity: .1
     * }</code>
     */
    visualizePathStyle?: object,
}