$(document).ready(function() {
    // Loop through each ul element with an id that starts with "image-"
    $("ul[id^='image-']").each(function() {
        const ulElement = $(this);
        const date = ulElement.attr('id').substring(6); // Extract date from id (remove "image-")
        const formattedDate = date.replace(/-/g, '/'); // Replace '-' with '/'

        // GitHub API URL for the image folder
        const apiUrl = `https://api.github.com/repos/modem-56k/img/git/trees/main?recursive=1`;

        // Fetch the list of files from GitHub
        $.getJSON(apiUrl, function(data) {
            const imageFiles = data.tree.filter(file => {
                return file.path.startsWith(`${formattedDate}/`) && (file.path.endsWith(".jpg") || file.path.endsWith(".jpeg"));
            });

            // Generate the HTML for each image
            imageFiles.forEach(file => {
                const imageUrl = `https://raw.githubusercontent.com/modem-56k/img/main/${file.path}`;
                const filename = file.path.split("/").pop().split(".")[0];

                const imageElement = `
                    <li>
                        <a href="${imageUrl}" title="${filename}" target="_blank">
                            <img src="//images.weserv.nl/?url=${imageUrl}&w=300&h=300&output=jpg&q=50&t=square" alt="${filename}" title="${filename}" />
                            <span>${filename}</span>
                        </a>
                    </li>
                `;

                // Append the image to the gallery
                ulElement.append(imageElement);
            });
        });
    });
});