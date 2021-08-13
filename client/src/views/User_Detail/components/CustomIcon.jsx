import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import PersonPin from '@material-ui/icons/PersonPin';

import { blue, grey } from '@material-ui/core/colors';

const isEmail = (string) => {
	const Regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	return Regex.test(string);
};

const CustomIconLink = ({ link, height, width }) => {
	return isEmail(link) ? (
		<EmailIcon style={{ height: height, width: width, color: grey[800] }} />
	) : link.toLowerCase().includes('linkedin') ? (
		<LinkedInIcon style={{ height: height, width: width, color: blue[800] }} />
	) : link.toLowerCase().includes('facebook') ? (
		<FacebookIcon style={{ height: height, width: width, color: blue[600] }} />
	) : (
		<PersonPin style={{ height: height, width: width, color: grey[600] }} />
	);
};

export default CustomIconLink;
