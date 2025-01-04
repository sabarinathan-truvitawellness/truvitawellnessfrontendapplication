import React from "react";
import './healthMatrixSection.scss';
import humanBodyImg from '../../Assets/images/home/human-body-img.png';
import { Blood, Heart, Others, Oxygen, RightArrow } from "../../utils/common/svgIcons";
import { Link } from "react-router-dom";
import './healthMatrixSection.scss'

export const HealthMatrixSection = () => {
  return (
    <div className="health-matrix-container">
      <div className="health-matrix-wrapper">
        <div className="hm-col-1">
          <div className="card-list-container">
            <div className="hm-card-container">
              <div className="hm-card-wrapper">
                <div className="card-row-1">
                  <div className="row-1"><Heart /><span>Heart Rate</span></div>
                  <div className="unit-status"><span>0 BPM</span></div>
                </div>
                <div className="card-row-2">
                  No Data Found
                </div>
              </div>

              <div className="hm-card-wrapper">
                <div className="card-row-1">
                  <div className="row-1"><Blood /><span>Blood Pressure</span></div>
                  <div className="unit-status"><span>0 BPM</span></div>
                </div>
                <div className="card-row-2">
                  No Data Found
                </div>
              </div>

              <div className="hm-card-wrapper">
                <div className="card-row-1">
                  <div className="row-1"><Oxygen /><span>Oxygen Levels</span></div>
                  <div className="unit-status"><span>0 BPM</span></div>
                </div>
                <div className="card-row-2">
                  No Data Found
                </div>
              </div>

              <div className="hm-spl-card-wrapper">
                <div className="spl-card-row-1">
                  <div><Others /></div>
                  <div><RightArrow /></div>
                </div>
                <div className="spl-card-row-2">
                  <Link to="/others">View Others</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hm-col-2">
          <h2>Your Body Stats</h2>
          <div className="body-img-wrapper">
            <img src={humanBodyImg} alt="Human Body" />
          </div>
        </div>
      </div>
    </div>
  );
};
