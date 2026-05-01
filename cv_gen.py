"""
cv_gen.py — PDF CV Generator
==============================
Generates a professional PDF CV from portfolio project data.

Requirements:
    pip install reportlab

Run:
    python cv_gen.py
Output:
    cv_output.pdf  (created in the same directory)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# ─────────────────────────────────────────────
# DATA — sourced from src/data/index.js
# ─────────────────────────────────────────────

OWNER = {
    "name": "John Ibukun",
    "title": "Health Data Analyst & Systems Thinker",
    "focus": "Improving healthcare infrastructure across Nigeria through data-driven tools and policy research.",
    "email": "your.email@example.com",       # ← update
    "linkedin": "linkedin.com/in/yourprofile", # ← update
    "github": "github.com/yourhandle",         # ← update
    "location": "Lagos, Nigeria",
}

PROJECTS = [
    {
        "title": "Drug Stockout Simulator",
        "subtitle": "Flagship Project",
        "year": "2024",
        "status": "In Development",
        "impact": "Models 47 drug categories across 200+ facilities",
        "description": (
            "Interactive simulation tool that models drug availability patterns in Nigerian "
            "public hospitals, identifying critical failure points in supply chains before "
            "they become patient crises. Ingests procurement data, historical consumption "
            "rates, and facility throughput to forecast drug depletion timelines."
        ),
        "tags": ["Supply Chain", "Simulation", "Nigeria", "Data Viz"],
        "key_findings": [
            "78% of stockouts are predictable 2–3 weeks in advance with existing procurement data",
            "Malaria drugs account for 41% of all critical stockout events",
            "Facilities within 50 km of a state capital have 60% fewer stockout days",
        ],
    },
    {
        "title": "Hospital Ops Dashboard",
        "subtitle": "Operations Intelligence",
        "year": "2024",
        "status": "Prototype",
        "impact": "Reduces reporting time by 70%",
        "description": (
            "Real-time operational monitoring system for hospital administrators. "
            "Tracks bed occupancy, pharmacy stock levels, and staff deployment efficiency. "
            "Surfaced the metrics that matter most to decision-makers in a unified command centre."
        ),
        "tags": ["Dashboard", "Operations", "React", "Analytics"],
        "key_findings": [
            "Average morning report takes 2.5 hours to compile across departments",
            "Bed utilisation data is typically 6–8 hours stale at point of decision",
        ],
    },
    {
        "title": "NPHCDA Data Pipeline",
        "subtitle": "Infrastructure",
        "year": "2025",
        "status": "Concept",
        "impact": "Covers 36 states + FCT",
        "description": (
            "ETL pipeline connecting National Primary Health Care Development Agency datasets "
            "to actionable visualisations for policy decision-makers. Automates ingestion and "
            "normalisation of raw NPHCDA data across inconsistent formats and missing LGA codes."
        ),
        "tags": ["ETL", "Policy", "Python", "PostgreSQL"],
        "key_findings": [
            "43% of raw dataset rows have LGA code mismatches",
            "Data completeness drops below 60% for northern geopolitical zones",
        ],
    },
    {
        "title": "Medicine Access Index (MAI)",
        "subtitle": "Research Tool",
        "year": "2025",
        "status": "Research",
        "impact": "774 LGAs tracked",
        "description": (
            "Composite index measuring medicine accessibility across Nigeria's 774 local "
            "government areas, combining affordability, availability, and quality metrics. "
            "Developed a 3-pillar scoring framework validated with field price surveys across 120 LGAs."
        ),
        "tags": ["Index", "Research", "Geospatial", "Policy"],
        "key_findings": [
            "Top-quintile LGAs have 4× better access scores than bottom-quintile",
            "Urban-rural gap explains 62% of access score variance",
        ],
    },
]

ESSAYS = [
    {
        "title": "Why the Future of Healthcare Systems Depends on Data",
        "date": "March 2025",
        "read_time": "8 min read",
        "tags": ["Data Strategy", "Nigeria", "Health Systems"],
        "excerpt": (
            "Nigeria loses billions annually to preventable drug stockouts. The solution isn't "
            "more funding — it's better data infrastructure that connects procurement decisions "
            "to real patient outcomes."
        ),
    },
    {
        "title": "The Invisible Crisis: Supply Chain Blindness in Nigerian Hospitals",
        "date": "February 2025",
        "read_time": "6 min read",
        "tags": ["Supply Chain", "Operations", "Infrastructure"],
        "excerpt": (
            "Hospital pharmacists across Lagos manage critical drug inventories using handwritten "
            "ledgers. This is not a funding problem. It's a systems design problem."
        ),
    },
    {
        "title": "Applying Product Thinking to Public Health Infrastructure",
        "date": "January 2025",
        "read_time": "10 min read",
        "tags": ["Product Design", "Public Health", "Systems Thinking"],
        "excerpt": (
            "Product managers obsess over user journeys. What happens when we apply the same lens "
            "to a patient's journey through a broken healthcare system?"
        ),
    },
    {
        "title": "Data Equity: Who Gets to See the Numbers?",
        "date": "December 2024",
        "read_time": "7 min read",
        "tags": ["Data Equity", "Policy", "Governance"],
        "excerpt": (
            "The same datasets that inform policy at the federal level are often invisible to the "
            "facility managers actually making day-to-day decisions. Data access is a power question."
        ),
    },
]

LAB_ITEMS = [
    {"title": "Stockout Heatmap",       "desc": "Geographic visualisation of drug stockouts across 6 geopolitical zones", "type": "chart"},
    {"title": "Procurement Gap Model",  "desc": "Statistical model identifying procurement inefficiencies",               "type": "model"},
    {"title": "Patient Wait Predictor", "desc": "ML prototype predicting emergency department wait times",                "type": "ml"},
    {"title": "Drug Expiry Tracker",    "desc": "Inventory tool for tracking near-expiry medications",                   "type": "tool"},
    {"title": "Facility Score Card",    "desc": "Performance ranking system for Primary Health Centres",                 "type": "data"},
    {"title": "Cost-Per-Patient Calc",  "desc": "Unit economics calculator for hospital administrators",                 "type": "calculator"},
]


# ─────────────────────────────────────────────
# COLOUR PALETTE
# ─────────────────────────────────────────────
DARK      = colors.HexColor("#0f172a")   # slate-900
ACCENT    = colors.HexColor("#38bdf8")   # sky-400
MUTED     = colors.HexColor("#64748b")   # slate-500
LIGHT_BG  = colors.HexColor("#f1f5f9")  # slate-100
WHITE     = colors.white
RULE_COL  = colors.HexColor("#e2e8f0")  # slate-200


# ─────────────────────────────────────────────
# STYLE HELPERS
# ─────────────────────────────────────────────
def build_styles():
    base = getSampleStyleSheet()

    styles = {
        "name": ParagraphStyle(
            "name", fontSize=26, leading=30, textColor=DARK,
            fontName="Helvetica-Bold", alignment=TA_LEFT,
        ),
        "title_line": ParagraphStyle(
            "title_line", fontSize=12, leading=16, textColor=ACCENT,
            fontName="Helvetica-Bold", alignment=TA_LEFT,
        ),
        "contact": ParagraphStyle(
            "contact", fontSize=9, leading=13, textColor=MUTED,
            fontName="Helvetica", alignment=TA_LEFT,
        ),
        "focus": ParagraphStyle(
            "focus", fontSize=10, leading=15, textColor=DARK,
            fontName="Helvetica-Oblique", alignment=TA_LEFT,
        ),
        "section_head": ParagraphStyle(
            "section_head", fontSize=11, leading=14, textColor=ACCENT,
            fontName="Helvetica-Bold", spaceBefore=8, spaceAfter=2,
        ),
        "project_title": ParagraphStyle(
            "project_title", fontSize=10.5, leading=14, textColor=DARK,
            fontName="Helvetica-Bold",
        ),
        "project_meta": ParagraphStyle(
            "project_meta", fontSize=8.5, leading=12, textColor=MUTED,
            fontName="Helvetica",
        ),
        "body": ParagraphStyle(
            "body", fontSize=9, leading=13, textColor=DARK,
            fontName="Helvetica",
        ),
        "bullet": ParagraphStyle(
            "bullet", fontSize=9, leading=13, textColor=DARK,
            fontName="Helvetica", leftIndent=12, bulletIndent=4,
        ),
        "tag": ParagraphStyle(
            "tag", fontSize=7.5, leading=10, textColor=ACCENT,
            fontName="Helvetica-Bold",
        ),
        "essay_title": ParagraphStyle(
            "essay_title", fontSize=9.5, leading=13, textColor=DARK,
            fontName="Helvetica-Bold",
        ),
        "essay_meta": ParagraphStyle(
            "essay_meta", fontSize=8, leading=11, textColor=MUTED,
            fontName="Helvetica",
        ),
        "essay_excerpt": ParagraphStyle(
            "essay_excerpt", fontSize=8.5, leading=12, textColor=DARK,
            fontName="Helvetica-Oblique",
        ),
    }
    return styles


def rule():
    return HRFlowable(width="100%", thickness=0.5, color=RULE_COL, spaceAfter=6, spaceBefore=4)


def section_heading(text, styles):
    return [
        Paragraph(text.upper(), styles["section_head"]),
        rule(),
    ]


def tag_row(tags, styles):
    joined = "  ·  ".join(tags)
    return Paragraph(joined, styles["tag"])


# ─────────────────────────────────────────────
# SECTION BUILDERS
# ─────────────────────────────────────────────
def build_header(owner, styles):
    elements = []
    elements.append(Paragraph(owner["name"], styles["name"]))
    elements.append(Paragraph(owner["title"], styles["title_line"]))
    elements.append(Spacer(1, 3 * mm))
    contact_line = (
        f'{owner["email"]}  |  {owner["linkedin"]}  |  '
        f'{owner["github"]}  |  {owner["location"]}'
    )
    elements.append(Paragraph(contact_line, styles["contact"]))
    elements.append(Spacer(1, 3 * mm))
    elements.append(Paragraph(owner["focus"], styles["focus"]))
    elements.append(Spacer(1, 5 * mm))
    return elements


def build_projects(projects, styles):
    elements = section_heading("Projects", styles)

    for i, p in enumerate(projects):
        # Title + meta row
        elements.append(Paragraph(p["title"], styles["project_title"]))
        meta = f'{p["subtitle"]}  ·  {p["year"]}  ·  <font color="#38bdf8">{p["status"]}</font>  ·  Impact: {p["impact"]}'
        elements.append(Paragraph(meta, styles["project_meta"]))
        elements.append(Spacer(1, 2 * mm))
        elements.append(Paragraph(p["description"], styles["body"]))
        elements.append(Spacer(1, 2 * mm))

        # Key findings
        elements.append(Paragraph("<b>Key Findings</b>", styles["body"]))
        for finding in p["key_findings"]:
            elements.append(Paragraph(f"• {finding}", styles["bullet"]))

        elements.append(Spacer(1, 2 * mm))
        elements.append(tag_row(p["tags"], styles))

        if i < len(projects) - 1:
            elements.append(Spacer(1, 4 * mm))
            elements.append(HRFlowable(width="100%", thickness=0.3, color=RULE_COL))
            elements.append(Spacer(1, 4 * mm))

    elements.append(Spacer(1, 6 * mm))
    return elements


def build_essays(essays, styles):
    elements = section_heading("Writing", styles)

    for i, e in enumerate(essays):
        elements.append(Paragraph(e["title"], styles["essay_title"]))
        meta = f'{e["date"]}  ·  {e["read_time"]}  ·  {" · ".join(e["tags"])}'
        elements.append(Paragraph(meta, styles["essay_meta"]))
        elements.append(Spacer(1, 1.5 * mm))
        elements.append(Paragraph(e["excerpt"], styles["essay_excerpt"]))
        if i < len(essays) - 1:
            elements.append(Spacer(1, 3 * mm))

    elements.append(Spacer(1, 6 * mm))
    return elements


def build_lab(lab_items, styles):
    elements = section_heading("Lab / Experiments", styles)

    table_data = [
        [
            Paragraph("<b>Tool / Experiment</b>", styles["body"]),
            Paragraph("<b>Type</b>", styles["body"]),
            Paragraph("<b>Description</b>", styles["body"]),
        ]
    ]
    for item in lab_items:
        table_data.append([
            Paragraph(item["title"], styles["body"]),
            Paragraph(item["type"].capitalize(), styles["tag"]),
            Paragraph(item["desc"], styles["body"]),
        ])

    col_widths = [45 * mm, 22 * mm, 100 * mm]
    tbl = Table(table_data, colWidths=col_widths, hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), LIGHT_BG),
        ("TEXTCOLOR",   (0, 0), (-1, 0), DARK),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, -1), 8.5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
        ("GRID",        (0, 0), (-1, -1), 0.3, RULE_COL),
        ("VALIGN",      (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING",  (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    elements.append(tbl)
    elements.append(Spacer(1, 6 * mm))
    return elements


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
def generate_cv(output_path="cv_output.pdf"):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=f"CV — {OWNER['name']}",
        author=OWNER["name"],
        subject="Curriculum Vitae",
    )

    styles = build_styles()
    story = []

    story += build_header(OWNER, styles)
    story += build_projects(PROJECTS, styles)
    story += build_essays(ESSAYS, styles)
    story += build_lab(LAB_ITEMS, styles)

    doc.build(story)
    print(f"✅  CV generated → {output_path}")


if __name__ == "__main__":
    generate_cv()
