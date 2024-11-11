import styles from "@/app/projects/wolverinesoft/page.module.css";
import Image from "next/image";
import wall from "./2d.png";
import preview from "./preview.png";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Devblog 4: October 27th - November 10th </h1>

      <hr />

      <h2>Week 1</h2>

      <h3>Studio Meeting 1 (October 27th): (2 hours)</h3>
      <p>
        Me and Ishita received two points feedback from Connor (Chen) and Hilary on our previous changes.
        - Update walls to always face the camera.
        - Fix tower/edge snapping between walls.
        For the latter of these changes, we decided to only snap the start markers for walls in order to conform to the grid layout.
      </p>

      <h3>Converting Walls to 2D: (2 hours)</h3>
      <p>
        There was some pre-existing scripts that allowed us to easily make the walls always face the camera.
        We had to change how some of other parts of the walls worked, such as the gates and side towers, so that they could also fit into the new 2D system.
      </p>

      <Image src={wall.src} alt="2D Walls" width={600} height={300} />

      <h3>Merge Conflicts: (1.5 hours)</h3>

      <p>
        I had to resolve some merge conflicts that arose from the changes that Ishita and I made to the walls.
        This was a bit of a headache since part of our branch was already merged with main, but parts of it (the new changes we made) were not.
        This ended up putting a pause on our work for the week, but we ended up resolving it by making a new branch from main and then manually adding our changes back in.
      </p>


      <h2>Week 2</h2>

      <h3>Studio Meeting 2 (November 3rd): (2 hours)</h3>

      <p>
        This week we discussed the changes we made to the walls and how we could improve them.
        Connor suggested that we make the walls preview match the new wall building mechanism.
        Although this seemed like a simple change, it ended up requiring to rewrite a lot of the wall preview logic.
      </p>

      <h3>Adjusting wall preview: (2 hours)</h3>

      <p>
        Since our previous building preview conssited of a single block that was resized to the length of the wall, we had to change it to be a series of walls that would be placed in the correct positions.
        We implemented this by repeatedly checking the snapped distance and direction of the cursor, and then programmatically building each of the wall segments on every frame.
      </p>

      <Image src={preview.src} alt="Wall Preview" width={600} height={300} />

      <h2>Summary of Hours</h2>
      <ul>
        <li>Studio Meeting 1: 2 hours</li>
        <li>Converting Walls to 2D: 2 hours</li>
        <li>Merge Conflicts: 1.5 hours</li>
        <li>Studio Meeting 2: 2 hours</li>
        <li>Adjusting wall preview: 2 hours</li>
      </ul>

      <p>
        <strong>Total Hours Spent:</strong> 9.5 hours
      </p>

      <p>
        Although these two weeks were a bit slower than the previous ones, we still managed to make some good progress on the walls.
        We should finally be nearing completion with the walls, and we can hopefully start work on the next feature soon.
      </p>
    </div>
  );
}
