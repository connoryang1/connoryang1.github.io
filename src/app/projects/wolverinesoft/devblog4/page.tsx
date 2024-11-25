import styles from "@/app/projects/wolverinesoft/page.module.css";
import Image from "next/image";
import bug from "./bug.png";
import updatedart from "./updatedart.png";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Devblog 4: November 10th - November 24th </h1>

      <hr />

      <h2>Week 1</h2>

      <h3>Studio Meeting 1 (November 10th): (2 hours)</h3>
      <p>
        After getting everything working with the 2D walls, we decided to move on to the next task: implementing wall textures.
        Although this was simple for the most part, there were a few intricacies that we had to work out.
        In particular, since the gate textures were directional, we had to account for the direction of wall placement and flip the texture accordingly.

        In additon we had a few other tasks including:
        - Fixing a visual glitch with the wall preview.
        - Decreasing wall placement time (previously it was way too slow).
      </p>


      <h3>Wall Preview Fix (1 hour)</h3>
      <p>
        The wall preview fix was also a simple issue, but took a while for me and Ishita to debug.
        This was mainly due to the fact that the bug was very consistent and difficult to reproduce.
        The issue was due to previous wall markers not being properly destroyed, so occasionally the previous preview would flash when the new preview was being placed.
      </p>

      <h3>Wall Placement Speedup (0.5 hours)</h3>
      <p>
        The wall placement speedup was a relatively simple fix.
        For the most part I just had to decrease the Construction Needed property of the wall prefab, but there was still a few underlying issues.
        In particular, this property only decreased the placement time up to a certain extent, which was still far too slow.
        I managed to come up with a temporary workaround by increasing the speed of the pickaxe tool.
      </p>

      <h3> Art Implementation (2 hours)</h3>
      <p>
        While most of the art implementation was straightforward (with some size tweaking to Hilary&#39; s liking), the gate textures were a bit more difficult.
        We were able to flip the gate texture by scaling it by a factor of -1 in the x direction, and using some previous wall placement logic, we were able to determine the direction of the wall and flip the texture accordingly.
      </p>

      <Image src={updatedart.src} alt="Updated Art" width={600} height={300} />

      <h2>Week 2</h2>

      <h3>Studio Meeting 2 (November 24th): (2 hours)</h3>

      <p>
        In this week&#39;s studio meeting, we discussed the progress we made on the wall textures and the next steps.
        We finally received approval on all aspects of the wall system, and we decided to move on to the next task: fixing the sprite rendering order.
        This was a broader goal, but we had some ideas on how to implement it from previous research when we were working on the 2D walls.
      </p>

      <h3>Sprite Rendering Order (2 hours)</h3>

      <p>
        The sprite rendering order was a bit of a headache to implement.
        We had to change the order in which the walls were rendered, so that walls that were closer to the camera were rendered on top of walls that were further away.
        We did this by changing the Z position of the walls based on their position in the grid.
        However, there were a few leftover bugs, particularly with equipment (and other objects that render together with units).
        Our current implementation is also rather inefficent, so we will have to revisit this in the future (though I believe Ishita has already begun working on optimizations).
      </p>

      <Image src={bug.src} alt="Wall Bug" width={600} height={300} />

      <h2>Summary of Hours</h2>
      <ul>
        <li>Studio Meeting 1: 2 hours</li>
        <li>Wall Preview Fix: 1 hour</li>
        <li>Wall Placement Speedup: 0.5 hours</li>
        <li>Art Implementation: 2 hours</li>
        <li>Studio Meeting 2: 2 hours</li>
        <li>Sprite Rendering Order: 2 hours</li>
      </ul>

      <p>
        <strong>Total Hours Spent:</strong> 9.5 hours
      </p>

      <p>
        This was a successful two weeks, and we managed to make some good progress on the wall system, finally completing it.
        Since this semester is coming to a close soon, I imagine the sprite rendering order will be the last major task we work on.
        We make some good initial progress on this task, and we will likely be focused on optimizing it in the coming weeks.
      </p>
    </div>
  );
}
