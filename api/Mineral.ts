/**
 * A mineral deposit. Can be harvested by creeps with a <code>WORK</code> body part using the extractor structure. 
 * Learn more about minerals from {@link http://docs.screeps.com/minerals.html this article}.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Regeneration amount</b></td>
 *         <td>
 *             <p><code>DENSITY_LOW</code>: 15,000</p>
 *             <p><code>DENSITY_MODERATE</code>: 35,000</p>
 *             <p><code>DENSITY_HIGH</code>: 70,000</p>
 *             <p><code>DENSITY_ULTRA</code>: 100,000</p>
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><b>Regeneration time</b></td>
 *         <td>50,000 ticks</td>
 *     </tr>
 *     <tr>
 *         <td><b>Density change probability</b></td>
 *         <td>
 *             <p><code>DENSITY_LOW</code>: 100% chance</p>
 *             <p><code>DENSITY_MODERATE</code>: 5% chance</p>
 *             <p><code>DENSITY_HIGH</code>: 5% chance</p>
 *             <p><code>DENSITY_ULTRA</code>: 100% chance</p>
 *         </td>
 *     </tr>
 *
 * </table>
 */
interface Mineral extends RoomObject {
    /**
     * The density of this mineral deposit, one of the <code>DENSITY_*</code> constants.
     */
    density: number,

    /**
     * The remaining amount of resources.
     */
    mineralAmount: number,

    /**
     * The resource type, one of the <code>RESOURCE_*</code> constants.
     */
    mineralType: string,

    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * The remaining time after which the deposit will be refilled.
     */
    ticksToRegeneration: number,
}