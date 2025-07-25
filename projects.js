// projects.js
const projects = [
    {
        title: "Optimized TicTacToe",
        description: "A small setup of tictactoe which optimizes the correct play based on the minimax algorithm. Implemented in javascript and hopefully ties or wins.",
        technologies: ["HTML", "CSS", "JavaScript"],
        id: "tictactoe-project", // Unique ID for the project's HTML section
        htmlContent: `
            <div class="endgame" style="display: none;">
                <div class="text"></div>
                <button>Replay</button>
            </div>
            <section class="game-board">
                <table>
                    <tr>
                        <td class="cell" id="0"></td>
                        <td class="cell" id="1"></td>
                        <td class="cell" id="2"></td>
                    </tr>
                    <tr>
                        <td class="cell" id="3"></td>
                        <td class="cell" id="4"></td>
                        <td class="cell" id="5"></td>
                    </tr>
                    <tr>
                        <td class="cell" id="6"></td>
                        <td class="cell" id="7"></td>
                        <td class="cell" id="8"></td>
                    </tr>
                </table>
            </section>
        `
    },
    {
        title: "Plant Sales Performance Dashboard", 
        description: "An interactive PowerBI dashboard visualizing plant sales performance for a made-up company, highlighting key metrics and trends.",
        technologies: ["PowerBI", "Data Analysis", "Reporting"], 
        id: "plant-sales-dashboard", 
        htmlContent: `
            <div class="dashboard-images">
                <p class="image-caption">Overview of Gross Profit</p>
                <img src="images/Projects/Powerbi_Plant_Dashboard/PlantGrossProfit.jpg" alt="Plant Sales Dashboard Overview" class="img">
                
                <p class="image-caption">Plant Sales Quantity</p>
                <img src="images/Projects/Powerbi_Plant_Dashboard/PlantQuantityPerfomance.jpg" alt="Plant Sales Dashboard Details" class="img">

                <p class="image-caption">Plant Sales Overview</p>
                 <img src="images/Projects/Powerbi_Plant_Dashboard/PlantSales.jpg" alt="Plant Sales Dashboard Overview" class="img">

                <p>
                    This dashboard was built in PowerBI Desktop to analyze fictitious plant sales data. It showcases data visualization best practices and provides insights into sales trends, product performance, and regional contributions.
                </p>
                <p class="note">
                    *Please note: PowerBI's web publishing requires a work/school account, this project is presented via screenshots.*
                </p>
            </div>
        `
    },
    {
        title: "2021 NFL data exploration and basic API",
        description:"Scraped advanced receiving statistics from Pro-Football-Reference.com. Storing the collected data in a SQLite database. Visualizing the data through multiple charts to highlight top performers in various statistical categories or combinations. Serving this data via a Python Flask API, which will then be accessed for presentation, potentially utilizing the lazySizes JavaScript library for optimized image loading.",
        technologies: ["Python", "Flask", "SQL"],
        id: "Receiving players in the NFL",
        htmlContent: `
            <a href="https://github.com/yuthegreat1/Project-3?tab=readme-ov-file" target="_blank">View on GitHub</a>
        `
    }
    // Add more projects here
];