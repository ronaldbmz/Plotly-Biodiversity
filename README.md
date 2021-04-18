# Plotly-Biodiversity

Built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Interactive dashboard contains the following:
- Subject ID Dropdown: Provides user the flexibility to select Subject Ids and updates the other charts accordingly

- Horizontal Bar Chart: To display the top 10 OTUs found in that individual:
  1. Used sample_values as the values for the bar chart
  2. Used otu_ids as the labels for the bar chart
  3. Used otu_labels as the hovertext for the chart
  
- Bubble Chart: That displays each sample:
  1. Used otu_ids for the x values.
  2. Used sample_values for the y values.
  3. Used sample_values for the marker size.
  4. Used otu_ids for the marker colors.
  5. Used otu_labels for the text values.

- Demographic Information: Display the sample metadata, i.e., an individual's demographic information.

- Gauge Chart: To plot the weekly washing frequency of the individual and update it when a new subject id gets selected in dropdown.

GitHub Page Link: https://ronaldbmz.github.io/Plotly-Biodiversity/
