import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/TrainDropDown.module.css'

const trainLines = [
{ label: 'T1 - North Shore Line', path: '#' },
{ label: 'T2 - Inner West Line',  path: '#' },
{ label: 'T3 - Bankstown Line',   path: '#' },
{ label: 'T4 - Eastern Suburbs',  path: '#' },
]

const TrainDropDown = () => {
    const [selected, setSelected] = useState(trainLines[0])
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    const handleSelect = (line) => {
        setSelected(line)
        setOpen(false)
        navigate(line.path)
    }

    return (
        <div className={styles.wrapper} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setOpen(!open)}>
                {selected.label}
                <span className={`${styles.arrow} ${open ? styles.arrowUp : ''}`}>▾</span>
            </button>

            {open && (
                <div className={styles.menu}>
                    {trainLines.map((line) => (
                        <button
                            key={line.path}
                            className={`${styles.item} ${selected.path === line.path ? styles.activeItem : ''}`}
                            onClick={() => handleSelect(line)}>
                            {line.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TrainDropDown