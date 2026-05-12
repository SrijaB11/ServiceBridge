const services = [
  {
    name: "Plumber",
    description:
      "Professional plumbing services for pipe leaks, tap repairs, bathroom fittings, water tank installation, and drainage issues.",
    image:
      "https://www.istockphoto.com/photos/plumber",
  },

  {
    name: "Electrician",
    description:
      "Expert electrical services including wiring, switch repairs, fan installation, lighting setup, and power issue fixing.",
    image:
      "https://www.magnific.com/free-photos-vectors/electrician",
  },

  {
    name: "Carpenter",
    description:
      "Skilled carpentry services for furniture repair, wooden fittings, modular work, door installation, and custom woodwork.",
    image:
      "https://www.google.com/imgres?q=give%20carpenter%20images&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fcarpenter-cutting-plank-by-circular-saw_329181-3731.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fcarpenter-services&docid=Z4RdU9VFp41JHM&tbnid=tF-RP8MbXre5zM&vet=12ahUKEwjpvrj09bKUAxX4amwGHdZnCMQQnPAOegQIEhAB..i&w=626&h=417&hcb=2&ved=2ahUKEwjpvrj09bKUAxX4amwGHdZnCMQQnPAOegQIEhAB",
  },

  {
    name: "AC repair",
    description:
      "Complete AC repair and maintenance services including gas filling, cooling issue fixing, installation, and servicing.",
    image:
      "https://www.google.com/imgres?q=give%20ac%20repair%20images&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F071%2F837%2F068%2Fsmall%2Ftechnician-repairing-white-wall-mounted-air-conditioner-in-modern-indoor-setting-free-photo.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fac-repair-services&docid=V9Ms9wi_Fn5k5M&tbnid=OpVmcDXYwX-pQM&vet=12ahUKEwiO3dmE9rKUAxUuB7wBHX6NO6sQnPAOegQIFxAB..i&w=642&h=350&hcb=2&ved=2ahUKEwiO3dmE9rKUAxUuB7wBHX6NO6sQnPAOegQIFxAB",
  },

  {
    name: "Painting",
    description:
      "Interior and exterior painting services with professional finishing, wall design, waterproof coating, and texture painting.",
    image:
      "https://www.google.com/imgres?q=give%20painter%20images&imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F05%2F65%2F96%2F17%2F360_F_565961715_k816GRDffq56ynGtNRQy9lch3J0ifKA5.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dprofessional%2Bpainter&docid=dcYt7xaxMLV_LM&tbnid=UVN-Y3PDrYPwcM&vet=12ahUKEwi1rumi9rKUAxXia2wGHX8WNPYQnPAOegQIHRAB..i&w=540&h=360&hcb=2&ved=2ahUKEwi1rumi9rKUAxXia2wGHX8WNPYQnPAOegQIHRAB",
  },

  {
    name: "Floor cleaning",
    description:
      "Deep floor cleaning services for tiles, marble, granite, and wooden floors using advanced cleaning equipment.",
    image:
      "https://www.google.com/imgres?q=give%20Floor%20cleaning%20images&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F048%2F057%2F677%2Fsmall%2Fa-person-mopping-a-clean-floor-with-a-blue-microfiber-mop-showcasing-effective-cleaning-techniques-in-a-modern-home-setting-photo.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Ffloor-cleaner&docid=6_MOMLjbrury8M&tbnid=3HWy5tFh88BNMM&vet=12ahUKEwi6ntq49rKUAxWfd2wGHakvDS0QnPAOegQIGRAB..i&w=738&h=350&hcb=2&ved=2ahUKEwi6ntq49rKUAxWfd2wGHakvDS0QnPAOegQIGRAB",
  },

  {
    name: "WashRoom Cleaning",
    description:
      "Professional bathroom and restroom cleaning with sanitization, stain removal, and odor control solutions.",
    image:
      "https://www.google.com/imgres?q=give%20WashRoom%20Cleaning%20images&imgurl=https%3A%2F%2Fhousing.com%2Fnews%2Fwp-content%2Fuploads%2F2024%2F01%2FBathroom-cleaning-checklist-Benefits-tools-steps-f.jpg&imgrefurl=https%3A%2F%2Fhousing.com%2Fnews%2Fbathroom-cleaning-checklist-for-a-fresh-and-hygienic-bathroom%2F&docid=OAtpnCMGaSsauM&tbnid=UlC8CwIXJHTJOM&vet=12ahUKEwiF9u3d9rKUAxWMxzgGHaBKCbUQnPAOegQISxAB..i&w=1200&h=700&hcb=2&ved=2ahUKEwiF9u3d9rKUAxWMxzgGHaBKCbUQnPAOegQISxAB",
  },

  {
    name: "Washing Machine repair",
    description:
      "Repair services for fully automatic and semi-automatic washing machines including motor, drum, and water flow issues.",
    image:
      "https://www.google.com/imgres?q=give%20Washing%20Machine%20repair%20images&imgurl=https%3A%2F%2Fclareservices.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fwashing-machine-repair-service-640x426.jpg&imgrefurl=https%3A%2F%2Fclareservices.com%2Fwashing-machine-repair-near-me-hyderabad%2F&docid=owIZ0Dc2dKL4RM&tbnid=5JrN_dQR_msCHM&vet=12ahUKEwjRgvaf97KUAxV9UGcHHT1SKbIQnPAOegQIGBAB..i&w=640&h=426&hcb=2&ved=2ahUKEwjRgvaf97KUAxV9UGcHHT1SKbIQnPAOegQIGBAB",
  },

  {
    name: "Refrigerator repair",
    description:
      "Expert refrigerator repair services for cooling problems, gas leakage, compressor issues, and maintenance.",
    image:
      "https://www.google.com/imgres?q=give%20Refrigerator%20repair%20images&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fhappy-male-worker-tools-repairing-260nw-2619295499.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ffridge-repair&docid=wYgSpMCZZj50iM&tbnid=pWbKtDzANAZmFM&vet=12ahUKEwjcqJW497KUAxUtamwGHWkqLFQQnPAOegQIIxAB..i&w=390&h=280&hcb=2&ved=2ahUKEwjcqJW497KUAxUtamwGHWkqLFQQnPAOegQIIxAB",
  },

  {
    name: "TV repair",
    description:
      "LED, LCD, and Smart TV repair services including screen issues, sound problems, motherboard repair, and installation.",
    image:
      "https://www.google.com/imgres?q=give%20TV%20repair%20images&imgurl=https%3A%2F%2Fsupersavvy.in%2F_next%2Fimage%3Furl%3Dhttps%253A%252F%252Fsupersavvy.in%252Fuploads%252F1765796259718.jpeg%26w%3D1080%26q%3D75&imgrefurl=https%3A%2F%2Fsupersavvy.in%2Ftv-repair-in-pune&docid=Jr0hvOwYkad7vM&tbnid=zppkfpbMO5QGvM&vet=12ahUKEwjF4c3Y97KUAxXBXWwGHWXQBMYQnPAOegQIHBAB..i&w=1080&h=807&hcb=2&ved=2ahUKEwjF4c3Y97KUAxXBXWwGHWXQBMYQnPAOegQIHBAB",
  },

  {
    name: "Pest control",
    description:
      "Safe and effective pest control solutions for termites, cockroaches, mosquitoes, rats, and other household pests.",
    image:
      "https://www.google.com/imgres?q=give%20Pest%20control%20images&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F045%2F826%2F650%2Fsmall%2Fperson-in-hazmat-suit-disinfecting-street-with-sprayer-surface-treatment-during-coronavirus-pandemic-a-guy-from-the-pest-control-service-in-a-mask-and-a-white-protective-suit-sprays-poisonous-gas-photo.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fpest-control&docid=kyx-Aw4or9NN1M&tbnid=MYlnegi75US6DM&vet=12ahUKEwiMtceI-LKUAxVjX2wGHXK3FR4QnPAOegQIIhAB..i&w=625&h=350&hcb=2&ved=2ahUKEwiMtceI-LKUAxVjX2wGHXK3FR4QnPAOegQIIhAB",
  },

  {
    name: "Water purifier repair",
    description:
      "RO and water purifier repair services including filter replacement, leakage fixing, and regular maintenance.",
    image:
      "https://www.google.com/imgres?q=give%20Water%20purifier%20repair%20images&imgurl=https%3A%2F%2Froserviceman.com%2Fwp-content%2Fuploads%2F2024%2F03%2FRo-Repair-1.jpg&imgrefurl=https%3A%2F%2Froserviceman.com%2F%3Fsrsltid%3DAfmBOooFCEx0IxQtPE4j4Gh_wboXIdVrJJS9Jg-QpF58bWBb1e2_5gTs&docid=KgNWi8mFvLAIvM&tbnid=Z0l92Kn-b6vdxM&vet=12ahUKEwirtp2e-LKUAxXOa2wGHT5PFcMQnPAOegQIHxAB..i&w=1000&h=666&hcb=2&ved=2ahUKEwirtp2e-LKUAxXOa2wGHT5PFcMQnPAOegQIHxAB",
  },

  {
    name: "Stove, Microwave repair",
    description:
      "Repair services for gas stoves, induction stoves, ovens, and microwave ovens with quick troubleshooting support.",
    image:
      "https://www.google.com/imgres?q=give%20Stove%2C%20Microwave%20repair%20images&imgurl=https%3A%2F%2Fwww.appliancecare.shop%2Fimages%2Fmicrowave_repair.webp&imgrefurl=https%3A%2F%2Fwww.appliancecare.shop%2Fmicrowave-repair-nashik.html&docid=GPvXbrHkjtTxpM&tbnid=-2z-8MCCZ7OjrM&vet=12ahUKEwi3r-X1-LKUAxUGUGwGHU6fEgIQnPAOegQIHBAB..i&w=1314&h=697&hcb=2&ved=2ahUKEwi3r-X1-LKUAxUGUGwGHU6fEgIQnPAOegQIHBAB",
  },

  {
    name: "Salon Men and Women",
    description:
      "Professional salon and beauty services for men and women including haircuts, styling, makeup, facial, and grooming.",
    image:
      "https://www.google.com/imgres?q=give%20Salon%20Men%20and%20Women%20images&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Ftwo-hairstylers-posing-standing-modern-spacy-beaty-salon_651396-986.jpg%3Fsemt%3Dais_hybrid%26w%3D740%26q%3D80&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fmen-women-hair-salon&docid=9MoVpCqkkL5adM&tbnid=V9849UBTqkKEOM&vet=12ahUKEwjDqbuI-bKUAxXsSGcHHYOQGhAQnPAOegQIFBAB..i&w=740&h=494&hcb=2&ved=2ahUKEwjDqbuI-bKUAxXsSGcHHYOQGhAQnPAOegQIFBAB",
  },
];

module.exports = services;