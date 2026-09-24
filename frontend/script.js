const form = document.getElementById("predictionForm");
const predictButton = document.getElementById("predictButton");

const resultSection = document.getElementById("resultSection");
const statusResult = document.getElementById("statusResult");
const probability = document.getElementById("probability");
const probabilityBar = document.getElementById("probabilityBar");
const probabilityMessage = document.getElementById("probabilityMessage");

const skillSummary = document.getElementById("skillSummary");
const skillGaps = document.getElementById("skillGaps");

const skillNameMap = {
    coding_skills: "Coding Skills",
    dsa_score: "DSA Score",
    aptitude_score: "Aptitude Score",
    communication_skills: "Communication Skills",
    ml_knowledge: "ML Knowledge",
    system_design: "System Design"
};


// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    predictButton.disabled = true;
    predictButton.innerHTML = "⏳ Analyzing Profile...";

    resultSection.classList.remove("show");

    const studentData = {

        branch: document.getElementById("branch").value,

        college_tier:
            document.getElementById("college_tier").value,

        cgpa:
            Number(document.getElementById("cgpa").value),

        backlogs:
            Number(document.getElementById("backlogs").value),

        coding_skills:
            Number(document.getElementById("coding_skills").value),

        dsa_score:
            Number(document.getElementById("dsa_score").value),

        aptitude_score:
            Number(document.getElementById("aptitude_score").value),

        communication_skills:
            Number(document.getElementById("communication_skills").value),

        ml_knowledge:
            Number(document.getElementById("ml_knowledge").value),

        system_design:
            Number(document.getElementById("system_design").value),

        internships:
            Number(document.getElementById("internships").value),

        projects_count:
            Number(document.getElementById("projects_count").value),

        certifications:
            Number(document.getElementById("certifications").value),

        hackathons:
            Number(document.getElementById("hackathons").value),

        open_source_contributions:
            Number(document.getElementById("open_source_contributions").value),

        extracurriculars:
            Number(document.getElementById("extracurriculars").value)
    };


    try {

        const response = await fetch(
            "https://student-placement-ml.onrender.com/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(studentData)
            }
        );


        if (!response.ok) {
            throw new Error("Prediction request failed");
        }


        const data = await response.json();

        showResults(data);

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the prediction server. Please try again."
        );

    }

    finally {

        predictButton.disabled = false;

        predictButton.innerHTML = "Predict Placement";
    }

});


// ===============================
// SHOW RESULTS
// ===============================

function showResults(data) {

    const isPlaced = data.prediction === 1;

    const probabilityValue =
        Number(data.placement_probability || 0);

    const probabilityPercent =
        probabilityValue.toFixed(2);


    // -------------------------------
    // Placement Status
    // -------------------------------

    statusResult.textContent =
        isPlaced
            ? "Likely to be Placed"
            : "Not Likely to be Placed";


    statusResult.className =
        isPlaced
            ? "status-badge success"
            : "status-badge danger";


    // -------------------------------
    // Probability
    // -------------------------------

    probability.textContent =
        `${probabilityPercent}%`;

    probabilityBar.style.width =
        `${probabilityValue}%`;


    // -------------------------------
    // Probability Message
    // -------------------------------

    if (probabilityValue >= 75) {

        probabilityMessage.textContent =
            "Your profile shows a relatively strong placement likelihood.";

    }

    else if (probabilityValue >= 50) {

        probabilityMessage.textContent =
            "Your profile shows a moderate placement likelihood. Improving key skills can strengthen your profile.";

    }

    else {

        probabilityMessage.textContent =
            "Your profile shows a lower placement likelihood. Focus on the identified skill gaps and improve your preparation.";

    }


    // -------------------------------
    // Skill Gap Summary
    // -------------------------------

    const gaps = data.skill_gaps || [];

    if (gaps.length === 0) {

        skillSummary.textContent =
            "🎉 No major skill gaps were identified.";

        skillGaps.innerHTML = `
            <div class="no-gaps">
                <div class="no-gaps-icon">✓</div>
                <h3>Great Job!</h3>
                <p>
                    Your selected skills are at or above
                    the dataset-based baseline.
                </p>
            </div>
        `;

    }

    else {

        skillSummary.textContent =
            `${gaps.length} skill area${gaps.length > 1 ? "s" : ""} need improvement.`;

        skillGaps.innerHTML = "";

        gaps.forEach(gap => {

            const skillName =
                skillNameMap[gap.skill] || gap.skill;

            const score =
                Number(gap.score);

            const baseline =
                Number(gap.baseline);

            const maxValue =
                gap.skill === "aptitude_score"
                    ? 100
                    : 10;

            const scorePercent =
                Math.min(
                    (score / maxValue) * 100,
                    100
                );


            const card = document.createElement("div");

            card.className = "skill-item";


            card.innerHTML = `

                <div class="skill-header">

                    <div>
                        <h3>${skillName}</h3>
                        <span>
                            Your Score: ${score}
                        </span>
                    </div>

                    <div class="skill-baseline">
                        Baseline: ${baseline}
                    </div>

                </div>


                <div class="skill-progress">

                    <div
                        class="skill-progress-fill"
                        style="width:${scorePercent}%"
                    ></div>

                </div>


                <div class="skill-recommendation">

                    <strong>💡 Recommendation</strong>

                    <p>
                        ${gap.recommendation}
                    </p>

                </div>

            `;


            skillGaps.appendChild(card);

        });

    }


    // -------------------------------
    // Show Result Section
    // -------------------------------

    resultSection.classList.add("show");

    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}


// ===============================
// RESET BUTTON
// ===============================

const resetButton =
    document.getElementById("resetButton");


if (resetButton) {

    resetButton.addEventListener("click", function () {

        form.reset();

        resultSection.classList.remove("show");

        statusResult.textContent = "";

        probability.textContent = "0%";

        probabilityBar.style.width = "0%";

        probabilityMessage.textContent = "";

        skillSummary.textContent = "";

        skillGaps.innerHTML = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}