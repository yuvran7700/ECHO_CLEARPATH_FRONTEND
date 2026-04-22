import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TryClearPathButton({ isDark = false }) {
    const navigate = useNavigate(); 
    // 1. Added 'const' to define the function
    const handleClick = () => {
        console.log("Button clicked!");
        navigate('/choose-mode')
    };

    return (
        <div onClick={handleClick}>
            <motion.button
                className="px-5 py-1.5 text-sm font-semibold rounded-full ml-1 transition-colors duration-200"
                style={{
                    background: isDark ? '#ffffff' : '#111111',
                    color: isDark ? '#111111' : '#ffffff',
                }}
                whileHover={{ scale: 1.03, opacity: 0.92 }}
                whileTap={{ scale: 0.97 }}
            >
                Try ClearPath
            </motion.button>
        </div>
    );
}