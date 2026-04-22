import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ← define AccordionItem FIRST, before AccordionObject
const AccordionItem = ({ item, depth = 0 }) => {
  return (
    <Accordion
      sx={{
        background: 'transparent',
        border: '1px solid #e5e4e7',
        borderRadius: '8px !important',
        boxShadow: 'none',
        marginBottom: '8px',
        marginTop: '20px',
        marginLeft: `${depth * 16}px`,
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-h)' }} />}
        sx={{
          padding: '0 16px',
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }
        }}
      >
        <Typography sx={{
          fontFamily: "'IBM Plex Mono', monospace !important",
          fontWeight: 400,
          fontSize: '14px',
          color: 'var(--text-h)',
        }}>
          {item.title}
        </Typography>
        <Typography sx={{
          fontSize: '12px',
          fontFamily: 'Inter',
          color: 'var(--accent)',
          background: 'rgba(117, 206, 85, 0.25)',
          padding: '2px 8px',
          borderRadius: '999px',
          marginLeft: 'auto',
          marginRight: '8px',
        }}>
          {item.type}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{
        padding: '0 16px 16px',
        color: 'var(--text)',
        fontSize: '14px',
        fontFamily: 'Inter',
        lineHeight: 1.6,
      }}>
        {item.content}

        {item.children && (
          <div>
            {item.children.map((child, index) => (
              <AccordionItem
                key={index}
                item={child}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

// ← AccordionObject just maps over top level items
const AccordionObject = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={index} item={item} depth={0} />
      ))}
    </div>
  )
}

export default AccordionObject

// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const AccordionObject = ({ items, depth = 0 }) => {
//   return (
//     <div>
//       {items.map((item, index) => (
//         <Accordion
//           key={index}
//           sx={{
//             background: 'transparent',
//             border: '1px solid #e5e4e7',
//             borderRadius: '8px !important',
//             boxShadow: 'none',
//             marginBottom: '8px',
//             marginTop:'20px',
//             '&:before': {
//               display: 'none'
//             }
//           }}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-h)' }} />}
//             sx={{
//               padding: '0 16px',
//               '& .MuiAccordionSummary-content': {
//                 display: 'flex',
//                 gap: '12px',
//                 alignItems: 'center',
//               }
//             }}
//           >
//             <Typography sx={{
//               fontFamily: "'IBM Plex Mono', monospace !important",
//               fontWeight: 400,
//               fontSize: '14px',
//               color: 'var(--text-h)',
//             }}>
//               {item.title}
//             </Typography>
//             <Typography sx={{
//               fontSize: '12px',
//               fontFamily: 'Inter',
//               color: 'var(--accent)',
//               background: ' rgba(117, 206, 85,0.25)',
//               padding: '2px 8px',
//               borderRadius: '999px',
//               marginLeft: 'auto',
//               marginRight: '8px',
//             }}>
//               {item.type}
//             </Typography>
//           </AccordionSummary>

//           <AccordionDetails sx={{
//             padding: '0 16px 16px',
//             color: 'var(--text)',
//             fontSize: '14px',
//             fontFamily: 'Inter',
//             lineHeight: 1.6,
//           }}>
//             {item.content}

//           {item.children && (
//             <div>
//             {item.children.map((child, index) => (
//               <AccordionItem
//                 key={index}
//                 item={child}
//                 depth={depth + 1}
//               />
//               ))}
//             </div>
//             )}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>
//   )
// }

// export default AccordionObject

// // import styles from '../styles/AccordianObject.module.css'
// // import { useState } from 'react'

// // const AccordianObjectS = ({ items }) => {
// //   const [openIndex, setOpenIndex] = useState(null)

// //   const handleClick = (index) => {
// //     setOpenIndex(openIndex === index ? null : index)
// //   }

// //   return (
// //     <div className={styles.accordion}>
// //       {items.map((item, index) =>(
// //         <div key={index} className={styles.item}>
// //           <button
// //             className={styles.trigger}
// //             onClick={() => handleClick(index)}
// //           >
// //             <span>{item.title} {item.type}</span>
// //             <span className={`${styles.arrow} ${openIndex === index ? styles.arrowOpen : ''}`}>
// //               ▾
// //             </span>
// //           </button>

// //           {openIndex === index && (
// //             <div className={`${styles.content} ${openIndex === index ? styles.contentOpen : ''}`}>
// //               <p>{item.content}</p>
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   )

// // }

// // export default AccordianObjectS