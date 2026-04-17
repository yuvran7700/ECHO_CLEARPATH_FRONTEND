import { useState, Fragment  } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Divider from '@mui/material/Divider'

const sections = [
  { label: 'Overview',          href: '#overview',  type: 'anchor' },
  { label: 'HTTP Status Codes', href: '#statcodes', type: 'anchor' },
  { label: 'ADAGE Object',      href: '#ADAGE',     type: 'anchor' },
  { label: 'Weather Microservice', type: 'heading' },
  { label: '\\collected',       href: '/',          type: 'external' },
  { label: '\\processed',       href: '/dashboard', type: 'external' },
]


const DocsSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerWidth = 400

  const sidebarContent = (
    <Box sx={{ padding: '16px 8px' }}>
      {sections.map((section, index) => {
        if (section.type === 'heading') {
          return (
            <p key={index} style={{
              fontSize: '20px',
              fontWeight: 600,
              fontFamily: 'Inter',
              color: '#E1EEEE',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              margin: '16px 0 4px 0',
              padding: '0 12px',
            }}>
              {section.label}
            </p>
            )
        }

        if (section.type === 'anchor') {
          return (
            <Fragment key={section.href}>
              <a
                href={section.href}
                onClick={() => setMobileOpen(false)}
                style={{
                textDecoration: 'none',
                color: '#E1EEEE',
                fontSize: '18px',
                fontFamily: 'Inter',
                padding: '20px 12px',
                borderRadius: '6px',
                borderLeft: '2px solid transparent',
                transition: 'all 0.2s',
                display: 'block',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#456990'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {section.label}
              </a>
              <Divider sx={{ margin: '4px 0', opacity: 0.3 }} />
            </Fragment>
          )
        }

        return (
           <Link
          key={section.href}
          to={section.href}
          onClick={() => setMobileOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#E1EEEE',
            fontSize: '18px',
            fontFamily: 'Inter',
            padding: '20px 12px',
            paddingLeft: '50px',
            borderRadius: '6px',
            display: 'block',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#456990'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {section.label}
        </Link>
        )
      })}
    </Box>
  )

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 200,
          background: 'var(--bg)',
          border: '1px solid var(--border)',
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'var(--bg)',
            borderRight: '1px solid var(--border)',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'var(--bg)',
            borderRight: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            height: '100vh',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  )
}

export default DocsSidebar