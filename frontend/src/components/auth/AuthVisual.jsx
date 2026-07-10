
import { motion } from "framer-motion";
import {
  RiBookOpenLine,
  RiCalendarCheckLine,
  RiFlashlightLine,
  RiTeamLine,
} from "react-icons/ri";

import studyWorld from "../../assets/study-world.png";

const features = [
  {
    icon: RiCalendarCheckLine,
    title: "Track progress",
    text: "Build consistent learning habits",
  },
  {
    icon: RiBookOpenLine,
    title: "Organize resources",
    text: "Keep notes and materials together",
  },
  {
    icon: RiTeamLine,
    title: "Study together",
    text: "Collaborate in realtime rooms",
  },
];

export default function AuthVisual({ mode = "login" }) {
  const heading =
    mode === "register"
      ? "Start building better study habits"
      : "Everything you need to learn better";

  const description =
    mode === "register"
      ? "Create your workspace and bring your notes, progress, resources and study partners into one place."
      : "Track your progress, organize your learning resources and collaborate with friends from a single workspace.";

  return (
    <section className="auth-visual-panel">
      <div className="auth-visual-content">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="auth-brand"
        >
          <div className="auth-brand-icon">
            <RiFlashlightLine />
          </div>

          <div>
            <h1 className="text-xl font-bold">StudyBuddy</h1>
            <p className="text-sm text-white/50">
              Learn consistently, together
            </p>
          </div>
        </motion.div>

        <div className="auth-image-stage">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="auth-image-card"
          >
            <motion.img
              src={studyWorld}
              alt="StudyBuddy learning world"
              className="auth-main-image"
              animate={{ scale: [1, 1.015, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="auth-image-copy">
              <h2>{heading}</h2>
              <p>{description}</p>
            </div>
          </motion.div>
        </div>

        <div className="auth-feature-row">
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.16 + index * 0.08,
                duration: 0.4,
              }}
              className="auth-feature-item"
            >
              <div className="auth-feature-item-icon">
                <Icon />
              </div>

              <div className="min-w-0">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="auth-quote"
        >
          “हर दिन की छोटी मेहनत, बड़ी सफलता की नींव बनती है।”
        </motion.p>
      </div>
    </section>
  );
}
