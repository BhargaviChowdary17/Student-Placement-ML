const predictionForm = document.getElementById("predictionForm");
const predictButton = document.getElementById("predictButton");

const resultSection = document.getElementById("resultSection");
const statusResult = document.getElementById("statusResult");
const probability = document.getElementById("probability");
const probabilityBar = document.getElementById("probabilityBar");
const probabilityMessage = document.getElementById("probabilityMessage");
const skillSummary = document.getElementById("skillSummary");
const skillGaps = document.getElementById("skillGaps");
const resetButton = document.getElementById("resetButton");

const API_URL = "https://student-placement-ml.onrender.com/predict";

const skillNameMap = {
    coding_skills: "Coding Skills",
    dsa_score: "DSA Score",
    aptitude_score: "Aptitude Score",
    communication_skills: "Communication Skills",
    ml_knowledge: "ML Knowledge",
    system_design: "System Design"
};


// ===============================
// PREDICTION
// ===============================

predictionForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    console.log("SUBMIT STARTED");

    predictButton.disabled = true;
    predictButton.textContent = "⏳ Predicting...";

    resultSection.classList.add("hidden");

    const studentData = {

        branch: document.getElementById("branch").value,
        college_tier: document.getElementById("college_tier").value,

        cgpa: Number(document.getElementById("cgpa").value),
        backlogs: Number(document.getElementById("backlogs").value),

        coding_skills: Number(
            document.getElementById("coding_skills").value
        ),

        dsa_score: Number(
            document.getElementById("dsa_score").value
        ),

        aptitude_score: Number(
            document.getElementById("aptitude_score").value
        ),

        communication_skills: Number(
            document.getElementById("communication_skills").value
        ),

        ml_knowledge: Number(
            document.getElementById("ml_knowledge").value
        ),

        system_design: Number(
            document.getElementById("system_design").value
        ),

        internships: Number(
            document.getElementById("internships").value
        ),

        projects_count: Number(
            document.getElementById("projects_count").value
        ),

        certifications: Number(
            document.getElementById("certifications").value
        ),

        hackathons: Number(
            document.getElementById("hackathons").value
        ),

        open_source_contributions: Number(
            document.getElementById("open_source_contributions").value
        ),

        extracurriculars: Number(
            document.getElementById("extracurriculars").value
        )
    };


    console.log("DATA SENT:", studentData);


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)

        });


        console.log("API STATUS:", response.status);


        if (!response.ok) {

            throw new Error(
                "API request failed with status " + response.status
            );

        }


        const result = await response.json();


        console.log("API RESULT:", result);


        displayResult(result);


    } catch (error) {

        console.error("PREDICTION ERROR:", error);

        alert(
            "Prediction failed.\n\n" +
            "Please try again.\n\n" +
            "Error: " + error.message
        );

    } finally {

        predictButton.disabled = false;

        predictButton.textContent = "🔍 Predict Placement";

    }

});


// ===============================
// DISPLAY RESULT
// ===============================

function displayResult(result) {

    resultSection.classList.remove("hidden");


    // -------------------------------
    // Prediction Status
    // -------------------------------

    if (Number(result.prediction) === 1) {

        statusResult.innerHTML = `
            <div class="status placed">
                ✅ Prediction: Likely to be Placed
            </div>
        `;

    } else {

        statusResult.innerHTML = `
            <div class="status not-placed">
                ⚠️ Prediction: Not Likely to be Placed
            </div>
        `;

    }


    // -------------------------------
    // Probability
    // -------------------------------

    const percentage =
        Number(result.placement_probability);


    probability.textContent =
        percentage.toFixed(2) + "%";


    probabilityBar.style.width =
        percentage + "%";


    if (percentage >= 75) {

        probabilityMessage.textContent =
            "Higher estimated likelihood based on the model.";

    } else if (percentage >= 50) {

        probabilityMessage.textContent =
            "Moderate estimated likelihood based on the model.";

    } else {

        probabilityMessage.textContent =
            "Lower estimated likelihood based on the model.";

    }


    // -------------------------------
    // Skill Gap Summary
    // -------------------------------

    skillSummary.textContent =
        result.skill_gap_summary || "";


    skillGaps.innerHTML = "";


    // -------------------------------
    // No Skill Gaps
    // -------------------------------

    if (
        !result.skill_gaps ||
        result.skill_gaps.length === 0
    ) {

        skillGaps.innerHTML = `
            <div class="no-gap">
                ✅ No major skill gaps identified based on the dataset baseline.
            </div>
        `;

    }


    // -------------------------------
    // Skill Gaps
    // -------------------------------

    else {

        result.skill_gaps.forEach(function (gap) {

            const skillName =
                skillNameMap[gap.skill] || gap.skill;


            const maxScore =
                gap.skill === "aptitude_score"
                    ? 100
                    : 10;


            const studentPercentage =
                Math.min(
                    (Number(gap.student_score) / maxScore) * 100,
                    100
                );


            const baselinePercentage =
                Math.min(
                    (Number(gap.dataset_baseline) / maxScore) * 100,
                    100
                );


            skillGaps.innerHTML += `

                <div class="skill-item">

                    <h4>${skillName}</h4>

                    <p>
                        <strong>Your Score:</strong>
                        ${gap.student_score}
                    </p>

                    <div class="score-bar-container">

                        <div
                            class="score-bar student-score-bar"
                            style="width:${studentPercentage}%">
                        </div>

                    </div>


                    <p>
                        <strong>Dataset Baseline:</strong>
                        ${gap.dataset_baseline}
                    </p>

                    <div class="score-bar-container">

                        <div
                            class="score-bar baseline-score-bar"
                            style="width:${baselinePercentage}%">
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

                </div>

            `;

        });

    }


    // Scroll to result

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ===============================
// RESET
// ===============================

resetButton.addEventListener("click", function () {

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

});