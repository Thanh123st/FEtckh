// ResultRes.js
import { useEffect } from 'react';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
import { Link } from 'react-router-dom';
import axios from "axios";


function ResultRes() {

  return (
    <div>
    <Banner/>
    <div class="layout-shared">
        <h1>Xác thực Email thành công</h1>
    </div>
    <Fooster/>
  </div>

  );
}

export default ResultRes;
