import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Produits from './Produits';
import Parteniares from './Parteniares';
import Livreurs from './Livreurs';
import Missions from './Missions';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width:'250px',
  },
}));

export default function TableauBord() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}      
        className={classes.tabs}
      >
        <Tab label="Meubles" {...a11yProps(0)} />
        <Tab label="Partenaires" {...a11yProps(1)} />
        <Tab label="Livreurs" {...a11yProps(2)} />
        <Tab label="Missions" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Produits></Produits>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Parteniares></Parteniares>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Livreurs></Livreurs>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Missions></Missions>
      </TabPanel>
    </div>
  );
}