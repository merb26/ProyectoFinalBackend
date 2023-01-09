import {serviceInfo} from '../services/serviceInfo.js';

export const controllerInfo = {
  getInfo: (req, res) => {
    const info = serviceInfo.getInfoProcess(req);

    res.render('./info/info', {info});
  },
};
