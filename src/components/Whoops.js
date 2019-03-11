import React from 'react';
import propTypes from 'prop-types';

export default function Whoops({location, match, history, authUser}) {
  return match.path === '/' ?
  (<div>Halaman tidak ditemukan</div>) : (<div>Halaman tidak ditemukan</div>)

}

Whoops.propTypes = {
  location: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
}
