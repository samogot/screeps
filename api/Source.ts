/**
 * An energy source object. Can be harvested by creeps with a <code>WORK</code> body part.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Energy amount</b></td>
 *         <td>
 *             <p>4000 in center rooms<p>
 *             <p>3000 in an owned or reserved room<p>
 *             <p>1500 in an unreserved room<p>
 *         </td>
 *     </tr>
 *     <tr>
 *         <td><b>Energy regeneration</b></td>
 *         <td>Every 300 game ticks</td>
 *     </tr>
 *
 * </table>
 */
interface Source extends RoomObject {
    /**
     * The remaining amount of energy.
     */
    energy: number,

    /**
     * The total amount of energy in the source.
     */
    energyCapacity: number,

    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * The remaining time after which the source will be refilled.
     */
    ticksToRegeneration: number,
}