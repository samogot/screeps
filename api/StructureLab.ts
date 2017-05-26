/**
 * Produces mineral compounds from base minerals and boosts creeps.
 * Learn more about minerals from {@link http://docs.screeps.com/minerals.html this article}.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-5</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>6</td>
 *         <td>3 labs</td>
 *     </tr>
 *     <tr>
 *         <td>7</td>
 *         <td>6 labs</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>10 labs</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>50,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>500</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>3000 mineral units, 2000 energy units</td>
 *     </tr>
 *     <tr>
 *         <td><b>Produce</b></td>
 *         <td>5 mineral compound units per reaction</td>
 *     </tr>
 *     <tr>
 *         <td><b>Reaction cooldown</b></td>
 *         <td>10 ticks</td>
 *     </tr>
 *     <tr>
 *         <td><b>Distance to input labs</b></td>
 *         <td>2 squares</td>
 *     </tr>
 *     <tr>
 *         <td><b>Boost cost</b></td>
 *         <td>30 mineral units, 20 energy units per body part</td>
 *     </tr>
 *
 * </table>
 */
interface StructureLab extends OwnedStructure {
    /**
     * The amount of game ticks the lab has to wait until the next reaction is possible.
     */
    cooldown: number,

    /**
     * The amount of energy containing in the lab. Energy is used for boosting creeps.
     */
    energy: number,

    /**
     * The total amount of energy the lab can contain.
     */
    energyCapacity: number,

    /**
     * The amount of mineral resources containing in the lab.
     */
    mineralAmount: number,

    /**
     * The type of minerals containing in the lab. Labs can contain only one mineral type at the same time.
     */
    mineralType: string,

    /**
     * The total amount of minerals the lab can contain.
     */
    mineralCapacity: number,

    /**
     * Boosts creep body parts using the containing mineral compound. The creep has to be at adjacent square to the lab.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} creep The target creep.
     * @param {number} bodyPartsCount (optional) The number of body parts of the corresponding type to be boosted. Body parts are always counted left-to-right for <code>TOUGH</code>, and right-to-left for other types. If undefined, all the eligible body parts are boosted.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this lab.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_FOUND}</td>
     *     <td>The mineral containing in the lab cannot boost any of the creep's body parts.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The lab does not have enough energy or minerals.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The targets is not valid creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The targets are too far away.</td>
     *   </tr>
     * </table>
     */
    boostCreep(creep: Creep, bodyPartsCount?: number): number,

    /**
     * Produce mineral compounds using reagents from two other labs. The same input labs can be used by many output labs.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureLab} lab1 The first source lab.
     * @param {StructureLab} lab2 The second source lab.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this lab.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The source lab do not have enough resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The targets are not valid lab objects.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target cannot receive any more energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The targets are too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The reaction cannot be run using this resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The lab is still cooling down.</td>
     *   </tr>
     * </table>
     */
    runReaction(lab1: StructureLab, lab2: StructureLab): number,

    /**
     * Transfer resource from this structure to a creep. The target has to be at adjacent square. You can transfer resources to your creeps from hostile structures as well.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target object.
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
     *     <td>You are not the owner of the target creep, or there is a hostile rampart on top of the structure.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The creep does not have the given amount of resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid Creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target cannot receive any more energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The amount or resource type is incorrect.</td>
     *   </tr>
     * </table>
     *
     * @deprecated Please use {@link Creep.withdraw} instead.
     */
    transfer(target: Creep, resourceType: string, amount?: number): number,
}