/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/**
 * RenderingDownloadLink ~
*/
export default class RenderingDownloadLink extends Component {
  translateRendering(value, t) {
    let newString = '';
    if (value.includes('Original source file')) {
      newString = value.replace('Original source file', t('originalSourceFile'));
    } else if (value.includes('Raw OCR Data')) {
      newString = value.replace('Raw OCR Data', t('rawOcrData'));
    } else if (value.includes('Technical Metadata')) {
      newString = value.replace('Technical Metadata', t('technicalMetadata'));
    } else if (value.includes('Download')) {
      newString = value.replace('Download', t('download'));
    } else {
      newString = value;
    }
    return newString;
  }

  render() {
    const { rendering, t } = this.props;
    return (
      <ListItem disableGutters divider key={rendering.id}>
        <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
          <Link href={rendering.id} rel="noopener noreferrer" target="_blank" variant="body1">
            {this.translateRendering(rendering.getLabel().getValue(), t) }
          </Link>
          {rendering.getFormat()
            && rendering.getFormat().value
            && ` (${rendering.getFormat().value})`
          }
        </ListItemText>
      </ListItem>
    );
  }
}


RenderingDownloadLink.propTypes = {
  rendering: PropTypes.shape({
    id: PropTypes.string.isRequired,
    getLabel: PropTypes.func.isRequired,
    getFormat: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func,
};

RenderingDownloadLink.defaultProps = {
  t: key => key,
};
