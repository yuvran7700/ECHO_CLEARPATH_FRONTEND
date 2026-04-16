import { motion, AnimatePresence } from "framer-motion";
import BrowserFrame from "./BrowserFrame";

export default function HeroContent({ activeView, viewImages }) {
  return (
    <BrowserFrame url={`clearpath.app/${activeView}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={activeView}
          src={viewImages[activeView]}
          alt={`${activeView} dashboard`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </BrowserFrame>
  );
}