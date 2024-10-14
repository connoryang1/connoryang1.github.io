import styles from "@/app/projects/wolverinesoft/devblog1/page.module.css";
import Image from "next/image";
import newimg from "./new.png";
import prev from "./prev.png";
import snaptogrid from "./snaptogrid.png";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Devblog 1: September 29th - October 13th</h1>

      <hr />

      <h2>Week 1</h2>
      <p>
        <strong>Studio Meeting 1:</strong> (2 hours) <br />
        This meeting introduced the studio and went through some basic programming onboarding tasks.
      </p>

      <h3>Programming Onboarding</h3>
      <p>
        <strong>Reading Confluence documents:</strong> (15 min) <br />
        I went through some of the required Confluence readings, including <em>How To Use A Debugger</em>, <em>Approaching Unfamiliar Codebases</em>, and <em>Event Bus Pattern</em>.
      </p>
      <p>
        <strong>Setting up the debugger with Rider:</strong> (30 min) <br />
        The setup process was smooth, though I ended up using Rider since Visual Studio has been discontinued for macOS. I managed to get the debugger working fine too, despite not seeing a section for it in the Confluence document.
      </p>
      <p>
        <strong>Full playthrough of the game:</strong> (15 min) <br />
        I played through the game to understand the current state of the project.
      </p>
      <p>
        <strong>Adding an enemy unit:</strong> (30 min) <br />
        As per the onboarding tasks, I made a pull request to add an enemy unit, familiarizing myself with the codebase.
      </p>
      <p>
        <strong>Exploring the codebase:</strong> (30 min) <br />
        After adding the enemy unit, I continued to explore the codebase, getting a general idea of the file structure. I also cross-referenced the documentation on Notion a lot to get a general feel of how the project is structured.
      </p>

      <h2>Week 2</h2>
      <div>
        <p>
          <strong>Studio Meeting 2:</strong> (2 hours) <br />
          In this meeting, I was assigned to fix the wall system alongside Ishita.
          We began by testing the current wall system in the game, discussing potential issues, solutions, and exploring available documentation.
          We found some relevant information from &quot;Base Management&quot; on wall implementation, but there was not too much to go off of.
          In the end, we were able to come up with a list of a few possible changes we could start with:
        </p>
          <Image src={prev.src} alt="Wall System" width={600} height={300} />
        <ul>
          <li>Snapping walls to a grid layout - at least in 4 directions, but possibly allow functionaly for up to 45 degree angles</li>
          <li>Removing the side towers/replacing them with a separate building</li>
          <li>Fix the current wall snapping to not stack towers when connecting a new wall to a previous one</li>
          <li>Make gates more visible and possibly be able customize their location, etc. more</li>
          <li>Some potential pathfinding bugs might exist, will require more testing</li>
        </ul>
      </div>

      <p>
        To begin, I explored the wall placement code, noting the use of three marker objects: <em>Start</em> (the start location of the wall), <em>End</em> (current cursor location), and <em>Walls</em> (adjusted to place walls at the midpoint).
        I conducted research by watching a few tutorials on grid-based implementations.
        This process took around 1 hour.
      </p>

      <p>
        I began the implementation phase by removing the side towers from the current system to simplify wall construction.
        I created a <code>SnapToGrid</code> function to align the walls to a grid.
      </p>

      <Image src={snaptogrid.src} alt="Snap To Grid" width={600} height={300} />
      <p>
        By wrapping a few existing functions with this new functionality, I was able to start snapping some parts of the wall-building process.
        Immediately an issue arose though, in the fact that while the start and end locations were snapping, the walls themselves were not.
        In addition, since the wall position and rotation calculations were under the assumption that the start and end markers faced each other, I had to adjust this so that the constructued wall would be placed in the correct spot.
        In the end, I managed to get a working prototype of a grid system for wall placement.
        In total, this process took about 3.5 hours.
      </p>

      <Image src={newimg.src} alt="New Wall System" width={600} height={300} />

      <h2>Summary of Hours</h2>
      <ul>
        <li>Studio Meeting 1: 2 hours</li>
        <li>Confluence Reading: 15 minutes</li>
        <li>Debugger Setup: 30 minutes</li>
        <li>Game Playthrough: 15 minutes</li>
        <li>Added Enemy Unit: 30 minutes</li>
        <li>Codebase Exploration: 30 minutes</li>
        <li>Studio Meeting 2: 2 hours</li>
        <li>Week 1 Research: 1 hour</li>
        <li>Week 2 Implementation: 3.5 hours</li>
      </ul>

      <p><strong>Total Hours Spent:</strong> 10 hours, 30 minutes</p>

      <p>
        In all, this was a decently succesful two weeks.
        Both me and Ishita were very busy for a lot of the second week due to midterms, and I had gotten quite ill, which were minor setbacks, but we were still able to finish our main goal of implementing a basic grid system.
        Since this was also the week of fall break, we were unable to meet with the rest of the team, but we plan to discuss our progress and potential next steps in the next studio meeting.
        For future sprints, we plan to continue working on the wall system, possibly adding more functionality and fixing some of the other issues we encountered.
        </p>
    </div>
  );
}
