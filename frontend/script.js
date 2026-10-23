
const studentProfileForm = document.getElementById("studentProfileForm");
const profileMessage = document.getElementById("profileMessage");

if (studentProfileForm) {
    studentProfileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const studentProfile = {
            name: document.getElementById("student_name").value.trim(),
            branch: document.getElementById("branch").value,
            college_tier: document.getElementById("college_tier").value,
            cgpa: Number(document.getElementById("cgpa").value),
            backlogs: Number(document.getElementById("backlogs").value)
        };

        sessionStorage.setItem("studentProfile", JSON.stringify(studentProfile));

        if (profileMessage) {
            profileMessage.classList.remove("hidden");
        }

        setTimeout(function () {
            window.location.href = "assessment.html";
        }, 700);
    });
}

async function loadAssessmentHistory() {
    const section = document.getElementById("assessmentHistorySection");

    if (!section) return;

    section.innerHTML = "<h2>Assessment History</h2><p>Loading...</p>";

    try {
        const response = await fetch("http://127.0.0.1:8000/assessment-history");

        if (!response.ok) {
            throw new Error("Unable to load history");
        }

        const data = await response.json();

        if (!data.history || data.history.length === 0) {
            section.innerHTML = "<h2>Assessment History</h2><p>No assessments saved yet.</p>";
            return;
        }

        const rows = data.history.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.student_name || "-"}</td>
                <td>${item.branch || "-"}</td>
                <td>${item.cgpa ?? "-"}</td>
                <td>${Number(item.mcq_percentage).toFixed(1)}%</td>
                <td>${Number(item.coding_average).toFixed(1)}%</td>
                <td>${Number(item.overall_assessment_score).toFixed(1)}%</td>
                <td><span class="prediction-label">${item.prediction_status || "-"}</span></td>
                <td>${Number(item.placement_probability).toFixed(2)}%</td>
                <td>${Array.isArray(item.skill_gaps) && item.skill_gaps.length ? item.skill_gaps.map(gap => { const skill = typeof gap === "string" ? gap : gap.skill || "Unknown"; return ({coding_skills: "Coding Skills", dsa_score: "DSA", aptitude_score: "Aptitude", communication_skills: "Communication Skills", ml_knowledge: "Machine Learning", system_design: "System Design"})[skill] || skill; }).join(", ") : "None identified"}</td>
                <td>${item.completed_at ? new Date(item.completed_at).toLocaleString() : "-"}</td>
            </tr>
        `).join("");

        section.innerHTML = `
            <h2>Assessment History</h2>
            <p>Saved assessments: ${data.count}</p>
            <div style="overflow-x:auto">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student</th>
                            <th>Branch</th>
                            <th>CGPA</th>
                            <th>MCQ</th>
                            <th>Coding</th>
                            <th>Overall</th>
                            <th>Prediction</th>
                            <th>Probability</th>
                            <th>Skill Gaps</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error("Assessment history error:", error);
        section.innerHTML = "<h2>Assessment History</h2><p>Could not load history. Check whether the backend is running.</p>";
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAssessmentHistory);
} else {
    loadAssessmentHistory();
}
