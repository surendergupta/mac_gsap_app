import { PresentationControls } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const setMeshesOpacity = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.transparent = true;
      child.material.opacity = opacity; // sync, no animation
    }
  });
};

const fadeMeshes = (group, toOpacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.transparent = true;
      gsap.killTweensOf(child.material);
      gsap.to(child.material, {
        opacity: toOpacity,
        duration: ANIMATION_DURATION,
      });
    }
  });
};

const moveGroup = (group, x) => {
  if (!group) return;
  gsap.killTweensOf(group.position);
  gsap.to(group.position, {
    x: x,
    duration: ANIMATION_DURATION,
  });
};
const ModelSwitcher = ({ scale, isMobile }) => {
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = scale >= 0.08 || scale <= 0.05;

  useLayoutEffect(() => {
    const small = smallMacbookRef.current;
    const large = largeMacbookRef.current;

    if (!small || !large) return;

    if (showLargeMacbook) {
      // Immediately set final states
      small.position.x = -OFFSET_DISTANCE;
      large.position.x = 0;

      setMeshesOpacity(small, 0);
      setMeshesOpacity(large, 1);
    } else {
      small.position.x = 0;
      large.position.x = OFFSET_DISTANCE;

      setMeshesOpacity(small, 1);
      setMeshesOpacity(large, 0);
    }
  }, []); // run once before first paint

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale, showLargeMacbook]);

  const controlsConfig = {
    snap: true,
    speed: 1.5,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };
  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
