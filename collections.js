const collections = {
    "collections": [
      {
        "name": "Party Vibes",
        "description": "A collection to dance to!",
        "settings": [
          {
            "name": "Rainbow Cycle",
            "FX_MODE": "FX_MODE_RAINBOW_CYCLE",
            "settings": [15, 30, 0],
            "min_values": [10, 20, 0],
            "max_values": [50, 100, 1],
            "number_of_settings": 3
          },
          {
            "name": "Strobe",
            "FX_MODE": "FX_MODE_STROBE",
            "settings": [120, 10],
            "min_values": [50, 5],
            "max_values": [200, 50],
            "number_of_settings": 2
          },
          {
            "name": "Chase",
            "FX_MODE": "FX_MODE_CHASE",
            "settings": [25, 50, 75, 100],
            "min_values": [10, 20, 30, 40],
            "max_values": [50, 80, 100, 150],
            "number_of_settings": 4
          }
        ]
      },
      {
        "name": "Relaxation Mode",
        "description": "Breathe in, breathe out",
        "settings": [
          {
            "name": "Breathe",
            "FX_MODE": "FX_MODE_BREATHE",
            "settings": [20, 70],
            "min_values": [10, 50],
            "max_values": [50, 100],
            "number_of_settings": 2
          },
          {
            "name": "Fade In-Out",
            "FX_MODE": "FX_MODE_FADE",
            "settings": [8],
            "min_values": [1],
            "max_values": [10],
            "number_of_settings": 1
          }
        ]
      },
      {
        "name": "Dynamic Energy",
        "description": "Get pumped with that collection",
        "settings": [
          {
            "name": "Meteor Shower",
            "FX_MODE": "FX_MODE_METEOR_SHOWER",
            "settings": [30, 60, 100],
            "min_values": [10, 20, 50],
            "max_values": [50, 100, 255],
            "number_of_settings": 3
          },
          {
            "name": "Twinkle",
            "FX_MODE": "FX_MODE_TWINKLE",
            "settings": [],
            "min_values": [],
            "max_values": [],
            "number_of_settings": 0
          },
          {
            "name": "Static",
            "FX_MODE": "FX_MODE_STATIC",
            "settings": [0, 128, 64],
            "min_values": [0, 0, 0],
            "max_values": [255, 255, 255],
            "number_of_settings": 3
          }
        ]
      },
      {
        "name": "Minimalist Lights",
        "description": "To use the Lesk lights on a daily basis",
        "settings": [
          {
            "name": "Fade In-Out",
            "FX_MODE": "FX_MODE_FADE",
            "settings": [5],
            "min_values": [1],
            "max_values": [10],
            "number_of_settings": 1
          },
          {
            "name": "Static",
            "FX_MODE": "FX_MODE_STATIC",
            "settings": [255, 255, 255],
            "min_values": [0, 0, 0],
            "max_values": [255, 255, 255],
            "number_of_settings": 3
          }
        ]
      }
    ]
  }

  export default collections;
  