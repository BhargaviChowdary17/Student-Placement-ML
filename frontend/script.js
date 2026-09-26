const API_URL =
    "https://student-placement-ml.onrender.com/predict";


const predictionForm =
    document.getElementById("predictionForm");

const predictButton =
    document.getElementById("predictButton");

const resetButton =
    document.getElementById("resetButton");

const resultResetButton =
    document.getElementById("resultResetButton");

const resultSection =
    document.getElementById("resultSection");

const statusResult =
    document.getElementById("statusResult");

const probability =
    document.getElementById("probability");

const probabilityBar =
    document.getElementById("probabilityBar");

const probabilityMessage =
    document.getElementById("probabilityMessage");

const skillSummary =
    document.getElementById("skillSummary");

const skillGaps =
    document.getElementById("skillGaps");


/* ================================
   Form Submit
================================ */

predictionForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        predictButton.disabled = true;
        predictButton.textContent = "Predicting...";

        resultSection.classList.add("hidden");


        /* Student Data */

        const studentData = {

            branch:
                document.getElementById("branch").value,

            college_tier:
                document.getElementById("college_tier").value,

            cgpa:
                Number(
                    document.getElementById("cgpa").value
                ),

            backlogs:
                Number(
                    document.getElementById("backlogs").value
                ),

            coding_skills:
                Number(
                    document.getElementById("coding_skills").value
                ),

            dsa_score:
                Number(
                    document.getElementById("dsa_score").value
                ),

            aptitude_score:
                Number(
                    document.getElementById("aptitude_score").value
                ),

            communication_skills:
                Number(
                    document.getElementById(
                        "communication_skills"
                    ).value
                ),

            ml_knowledge:
                Number(
                    document.getElementById(
                        "ml_knowledge"
                    ).value
                ),

            system_design:
                Number(
                    document.getElementById(
                        "system_design"
                    ).value
                ),

            internships:
                Number(
                    document.getElementById(
                        "internships"
                    ).value
                ),

            projects_count:
                Number(
                    document.getElementById(
                        "projects_count"
                    ).value
                ),

            certifications:
                Number(
                    document.getElementById(
                        "certifications"
                    ).value
                ),

            hackathons:
                Number(
                    document.getElementById(
                        "hackathons"
                    ).value
                ),

            open_source_contributions:
                Number(
                    document.getElementById(
                        "open_source_contributions"
                    ).value
                ),

            extracurriculars:
                Number(
                    document.getElementById(
                        "extracurriculars"
                    ).value
                )
        };


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(studentData)
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Prediction request failed"
                );

            }


            const result =
                await response.json();


            displayResult(result);

        }


        catch (error) {

            console.error(
                "Prediction Error:",
                error
            );

            alert(
                "Unable to connect to the prediction server. Please try again."
            );

        }


        finally {

            predictButton.disabled = false;

            predictButton.textContent =
                "Predict Placement";

        }

    }
);


/* ================================
   Display Result
================================ */

function displayResult(result) {

    resultSection.classList.remove("hidden");


    /* Placement Status */

    if (result.prediction === 1) {

        statusResult.innerHTML = `
            <div class="status placed">
                Prediction: Likely to be Placed
            </div>
        `;

    }

    else {

        statusResult.innerHTML = `
            <div class="status not-placed">
                Prediction: Not Likely to be Placed
            </div>
        `;

    }


    /* Probability */

    const percentage =
        Number(
            result.placement_probability
        );


    probability.textContent =
        `${percentage}%`;


    probabilityBar.style.width =
        `${percentage}%`;


    if (percentage >= 75) {

        probabilityMessage.textContent =
            "Higher estimated likelihood based on the model.";

    }

    else if (percentage >= 50) {

        probabilityMessage.textContent =
            "Moderate estimated likelihood based on the model.";

    }

    else {

        probabilityMessage.textContent =
            "Lower estimated likelihood based on the model.";

    }


    /* Skill Gap Summary */

    skillSummary.textContent =
        result.skill_gap_summary;


    skillGaps.innerHTML = "";


    /* No Skill Gaps */

    if (
        !result.skill_gaps ||
        result.skill_gaps.length === 0
    ) {

        skillGaps.innerHTML = `
            <div class="no-gap">
                No major skill gaps identified based on the dataset baseline.
            </div>
        `;

    }


    /* Skill Gaps */

    else {

        const skillNameMap = {

            coding_skills:
                "Coding Skills",

            dsa_score:
                "DSA Score",

            aptitude_score:
                "Aptitude Score",

            communication_skills:
                "Communication Skills",

            ml_knowledge:
                "ML Knowledge",

            system_design:
                "System Design"

        };


        result.skill_gaps.forEach(
            function (gap) {

                const skillName =
                    skillNameMap[gap.skill]
                    || gap.skill;


                const maxScore =
                    gap.skill ===
                    "aptitude_score"
                        ? 100
                        : 10;


                const studentPercentage =
                    Math.min(
                        (
                            gap.student_score /
                            maxScore
                        ) * 100,
                        100
                    );


                const baselinePercentage =
                    Math.min(
                        (
                            gap.dataset_baseline /
                            maxScore
                        ) * 100,
                        100
                    );


                const skillItem =
                    document.createElement("div");


                skillItem.className =
                    "skill-item";


                skillItem.innerHTML = `

                    <h4>${skillName}</h4>

                    <p>
                        <strong>Your Score:</strong>
                        ${gap.student_score}
                    </p>

                    <div class="score-bar-container">
                        <div
                            class="score-bar student-score-bar"
                            style="width: ${studentPercentage}%">
                        </div>
                    </div>


                    <p>
                        <strong>Dataset Baseline:</strong>
                        ${gap.dataset_baseline}
                    </p>

                    <div class="score-bar-container">
                        <div
                            class="score-bar baseline-score-bar"
                            style="width: ${baselinePercentage}%">
                        </div>
                    </div>


                    <p>
                        <strong>Status:</strong>
                        ${gap.status}
                    </p>


                    <p>
                        <strong>Recommendation:</strong>
                        ${gap.recommendation}
                    </p>

                `;


                skillGaps.appendChild(
                    skillItem
                );

            }
        );

    }


    /* Scroll to Results */

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================================
   Reset Form
================================ */

function resetApplication() {

    predictionForm.reset();

    resultSection.classList.add("hidden");

    statusResult.innerHTML = "";

    probability.textContent = "--%";

    probabilityBar.style.width = "0%";

    probabilityMessage.textContent =
        "Enter your details and predict your placement.";

    skillSummary.textContent = "";

    skillGaps.innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


resetButton.addEventListener(
    "click",
    resetApplication
);


resultResetButton.addEventListener(
    "click",
    resetApplication
);