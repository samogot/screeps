/**
 * Non-player structure. Contains power resource which can be obtained by destroying the structure.
 * Hits the attacker creep back on each attack. Learn more about power
 * from {@link http://support.screeps.com/hc/en-us/articles/205971132-Power this article}.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>2,000,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Return damage</b></td>
 *         <td>50%</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>500 — 10,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Decay</b></td>
 *         <td>5,000 ticks</td>
 *     </tr>
 *
 * </table>
 */
interface StructurePowerBank extends Structure {
    /**
     * The amount of power containing.
     */
    power: number,

    /**
     * The amount of game ticks when this structure will disappear.
     */
    ticksToDecay: number,
}